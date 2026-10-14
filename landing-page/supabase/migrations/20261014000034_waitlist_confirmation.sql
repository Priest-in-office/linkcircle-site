-- Confirmation email to each new waitlist sign-up, sent by the notify Edge Function
-- ({ type: 'waitlist', record }). Repeat sign-ups are rejected by the unique index,
-- so nobody is emailed twice. The team's batched summaries are unaffected.
create trigger waitlist_confirmation_notify
  after insert on public.waitlist
  for each row execute function notify_instant();
