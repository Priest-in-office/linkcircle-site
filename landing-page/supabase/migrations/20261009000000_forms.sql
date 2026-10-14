-- LinkCircle landing page: form storage, security and email notifications.
-- Run once in the Supabase SQL Editor (or `supabase db push`).
-- Before running: complete step 4 of the setup (the two vault secrets) — the triggers read them.

-- ─────────────────────────────────────────────────────────────
-- 1. Extensions
-- ─────────────────────────────────────────────────────────────
create extension if not exists pg_net;   -- lets the database call the Edge Function
create extension if not exists pg_cron;  -- weekly waitlist summary

-- ─────────────────────────────────────────────────────────────
-- 2. Tables
-- ─────────────────────────────────────────────────────────────
create table public.waitlist (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  email             text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  first_name        text check (char_length(first_name) <= 80),
  marketing_consent boolean not null default false,
  notified_at       timestamptz            -- set once Emmanuel has been emailed about this sign-up
);
-- One sign-up per email, case-insensitive. A repeat sign-up returns 409, which the site treats as success.
create unique index waitlist_email_unique on public.waitlist (lower(email));
create index waitlist_unnotified on public.waitlist (created_at) where notified_at is null;

create table public.companion_interest (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 120),
  email      text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  offer      text check (char_length(offer) <= 2000)
);

create table public.care_enquiries (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  organisation      text not null check (char_length(organisation) between 1 and 160),
  contact_name      text not null check (char_length(contact_name) between 1 and 120),
  email             text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  organisation_type text not null check (char_length(organisation_type) <= 60),
  message           text check (char_length(message) <= 4000)
);

-- ─────────────────────────────────────────────────────────────
-- 3. Row Level Security: the public can submit, nobody can read
-- ─────────────────────────────────────────────────────────────
alter table public.waitlist           enable row level security;
alter table public.companion_interest enable row level security;
alter table public.care_enquiries     enable row level security;

create policy "public can join waitlist"
  on public.waitlist for insert to anon
  with check (notified_at is null);   -- visitors can't mark their own row as already reported

create policy "public can register companion interest"
  on public.companion_interest for insert to anon with check (true);

create policy "public can send care enquiry"
  on public.care_enquiries for insert to anon with check (true);

-- No select/update/delete policies exist, so the anon key can only insert.
-- Emmanuel reads submissions in the dashboard (Table Editor), which bypasses RLS.

-- Data API access. Supabase no longer exposes new public tables automatically,
-- so grant exactly what each role needs (and nothing else).
revoke all on public.waitlist, public.companion_interest, public.care_enquiries from anon, authenticated;
grant insert on public.waitlist, public.companion_interest, public.care_enquiries to anon;
-- The notify Edge Function counts, claims and reads waitlist rows with the service role.
grant select, update on public.waitlist to service_role;

-- ─────────────────────────────────────────────────────────────
-- 4. Helper: call the notify Edge Function
--    Reads two vault secrets created in setup step 4:
--      project_url     → https://<project-ref>.supabase.co
--      webhook_secret  → the same random string set as WEBHOOK_SECRET on the function
-- ─────────────────────────────────────────────────────────────
create or replace function private_notify(payload jsonb)
returns void
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  base_url text;
  secret   text;
begin
  select decrypted_secret into base_url from vault.decrypted_secrets where name = 'project_url';
  select decrypted_secret into secret   from vault.decrypted_secrets where name = 'webhook_secret';

  if base_url is null or secret is null then
    raise warning 'notify skipped: vault secrets project_url / webhook_secret are missing';
    return;
  end if;

  perform net.http_post(
    url     := base_url || '/functions/v1/notify',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-webhook-secret', secret),
    body    := payload
  );
end;
$$;

revoke all on function private_notify(jsonb) from public, anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- 5. Triggers
-- ─────────────────────────────────────────────────────────────

-- Care enquiries and companion interest: email instantly, one per submission.
create or replace function notify_instant()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform private_notify(jsonb_build_object('type', tg_table_name, 'record', to_jsonb(new)));
  return new;
end;
$$;

create trigger care_enquiry_notify
  after insert on public.care_enquiries
  for each row execute function notify_instant();

create trigger companion_interest_notify
  after insert on public.companion_interest
  for each row execute function notify_instant();

-- Waitlist: email once 10 unreported sign-ups have built up.
create or replace function notify_waitlist_batch()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.waitlist where notified_at is null) >= 10 then
    perform private_notify(jsonb_build_object('type', 'waitlist_batch'));
  end if;
  return new;
end;
$$;

create trigger waitlist_batch_notify
  after insert on public.waitlist
  for each row execute function notify_waitlist_batch();

-- Trigger functions run as their owner, never called directly by visitors.
revoke all on function notify_instant()        from public, anon, authenticated;
revoke all on function notify_waitlist_batch() from public, anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- 6. Weekly summary: every Monday 08:00 UTC, email any sign-ups
--    the batches haven't reported yet (sends nothing if there are none)
-- ─────────────────────────────────────────────────────────────
select cron.schedule(
  'waitlist-weekly-summary',
  '0 8 * * 1',
  $$ select private_notify(jsonb_build_object('type', 'waitlist_weekly')); $$
);

-- ─────────────────────────────────────────────────────────────
-- 7. Keep-alive endpoint for the free plan
--    A GitHub Action calls this every 3 days so the project isn't paused for inactivity.
-- ─────────────────────────────────────────────────────────────
create or replace function public.ping()
returns text
language sql
stable
as $$ select 'ok'::text $$;

grant execute on function public.ping() to anon;
