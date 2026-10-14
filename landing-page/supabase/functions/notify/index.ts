// LinkCircle "notify" Edge Function.
// Called only by the database (triggers and the weekly cron job), never by the website.
//
// Payloads:
//   { type: 'care_enquiries',     record }  → instant email to the team, plus a confirmation to the enquirer
//   { type: 'companion_interest', record }  → instant email to the team, plus a confirmation to the companion
//   { type: 'waitlist',           record }  → confirmation email to the person who just joined the waitlist
//   { type: 'waitlist_batch' }              → email the team every unreported sign-up, if there are 10 or more
//   { type: 'waitlist_weekly' }             → email the team every unreported sign-up, if there are any
//
// Secrets (Supabase dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY   Resend API key from LinkCircle's Resend account
//   NOTIFY_TO        Emmanuel's official inbox, e.g. hello@linkcircle.co.uk (also the reply-to on confirmations)
//   NOTIFY_FROM      Verified sender address for team emails, e.g. notifications@linkcircle.co.uk (any display name is replaced)
//   PUBLIC_FROM      Optional sender address for confirmations, e.g. welcome@linkcircle.co.uk (its domain must be
//                    verified in Resend). Until it is set, confirmations use the NOTIFY_FROM address.
//   WEBHOOK_SECRET   Same random string stored in the vault as webhook_secret
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically.

import { createClient } from 'npm:@supabase/supabase-js@2'

const BATCH_SIZE = 10
/** Sender name on emails to the team. */
const TEAM_SENDER = 'LinkCircle Updates'
/** Sender name on emails to the public. */
const PUBLIC_SENDER = 'The LinkCircle Team'

const env = (key: string) => {
  const value = Deno.env.get(key)
  if (!value) throw new Error(`Missing secret: ${key}`)
  return value
}

const supabase = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), {
  auth: { persistSession: false },
})

type Row = Record<string, string | boolean | null>

type WaitlistRow = {
  id: string
  created_at: string
  email: string
  first_name: string | null
  marketing_consent: boolean
}

const escape = (value: unknown) =>
  String(value ?? '—')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const londonTime = (iso: unknown) =>
  new Date(String(iso)).toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'medium', timeStyle: 'short' })

/** Secrets may hold "Name <address>" or a bare address; only the address is kept. */
const addressOf = (from: string) => (from.match(/<([^>]+)>/)?.[1] ?? from).trim()

const teamSender = () => `${TEAM_SENDER} <${addressOf(env('NOTIFY_FROM'))}>`
const publicSender = () => `${PUBLIC_SENDER} <${addressOf(Deno.env.get('PUBLIC_FROM') || env('NOTIFY_FROM'))}>`

type Email = {
  subject: string
  html: string
  text?: string
  replyTo?: string
  /** Defaults to the team inbox. */
  to?: string
  /** "Name <address>". Defaults to the team sender. */
  from?: string
}

async function sendEmail({ subject, html, text, replyTo, to = env('NOTIFY_TO'), from = teamSender() }: Email) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(text ? { text } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
}

const layout = (heading: string, body: string) => `
  <div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#0b1b33;max-width:640px">
    <h2 style="color:#0057c1;margin:0 0 16px">${heading}</h2>
    ${body}
  </div>`

const detailsTable = (rows: [string, unknown][]) =>
  `<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="color:#46546b;vertical-align:top;white-space:nowrap">${label}</td><td style="white-space:pre-wrap">${escape(value)}</td></tr>`,
    )
    .join('')}</table>`

/** Sends every email even if one fails, then reports the first failure. */
async function sendAll(...emails: Promise<void>[]) {
  const failed = (await Promise.allSettled(emails)).find((r): r is PromiseRejectedResult => r.status === 'rejected')
  if (failed) throw failed.reason
}

const firstName = (name: unknown) => String(name ?? '').trim().split(/\s+/)[0]

const NOT_YOU = "If you didn't send this, you can ignore this email, or reply and we'll remove your details."

/** Confirmation to the person who filled in a form, from PUBLIC_SENDER. Replies go to the team inbox. */
async function sendConfirmation(to: string, subject: string, heading: string, paragraphs: string[]) {
  await sendEmail({
    to,
    from: publicSender(),
    replyTo: env('NOTIFY_TO'),
    subject,
    html: layout(
      escape(heading),
      paragraphs.map((p) => `<p style="line-height:1.6">${escape(p)}</p>`).join('') +
        `<p style="line-height:1.6;margin-top:24px">${PUBLIC_SENDER}</p>`,
    ),
    text: [heading, ...paragraphs, PUBLIC_SENDER].join('\n\n'),
  })
}

async function notifyCare(r: Row) {
  const toTeam = sendEmail({
    subject: `New care organisation enquiry: ${r.organisation}`,
    html: layout(
      'New care organisation enquiry',
      `<p>Reply to this email to answer ${escape(r.contact_name)} directly.</p>` +
        detailsTable([
          ['Organisation', r.organisation],
          ['Type', r.organisation_type],
          ['Contact', r.contact_name],
          ['Email', r.email],
          ['Message', r.message],
          ['Received', londonTime(r.created_at)],
        ]),
    ),
    replyTo: String(r.email),
  })
  const toSender = sendConfirmation(String(r.email), "We've received your request", `Thank you, ${firstName(r.contact_name)}.`, [
    `Thanks for getting in touch on behalf of ${r.organisation}. We've received your request and will be in touch to arrange a conversation.`,
    "If there's anything you'd like to add in the meantime, just reply to this email.",
    NOT_YOU,
  ])
  await sendAll(toTeam, toSender)
}

async function notifyCompanion(r: Row) {
  const toTeam = sendEmail({
    subject: `New companion registration: ${r.name}`,
    html: layout(
      'New companion registration',
      `<p>Reply to this email to contact ${escape(r.name)} directly.</p>` +
        detailsTable([
          ['Name', r.name],
          ['Email', r.email],
          ['What they would offer', r.offer],
          ['Received', londonTime(r.created_at)],
        ]),
    ),
    replyTo: String(r.email),
  })
  const toSender = sendConfirmation(
    String(r.email),
    'Thanks for your interest in becoming a LinkCircle companion',
    `Thank you, ${firstName(r.name)}.`,
    [
      "Thanks for registering your interest in becoming a LinkCircle companion. We've received your details and will be in touch as we get closer to launch.",
      NOT_YOU,
    ],
  )
  await sendAll(toTeam, toSender)
}

/** Confirmation to the person who just joined the waitlist. */
async function confirmWaitlist(r: WaitlistRow) {
  await sendConfirmation(
    r.email,
    "You're on the LinkCircle waitlist",
    r.first_name ? `You're on the list, ${r.first_name}.` : "You're on the list.",
    [
      "Thanks for joining the LinkCircle waitlist. We'll email you as soon as LinkCircle is ready.",
      ...(r.marketing_consent
        ? ["You also asked to hear our updates along the way, so we'll keep you posted. If you change your mind, just reply to this email."]
        : []),
      "If you didn't sign up, you can ignore this email, or reply and we'll remove your details.",
    ],
  )
}

async function notifyWaitlist(minimum: number, label: string) {
  const { count, error: countError } = await supabase
    .from('waitlist')
    .select('id', { count: 'exact', head: true })
    .is('notified_at', null)
  if (countError) throw countError
  if ((count ?? 0) < minimum) return `skipped: ${count ?? 0} unreported`

  // Claim the rows atomically, so two batches firing at once can't email the same sign-ups twice.
  const claimedAt = new Date().toISOString()
  const { data, error } = await supabase
    .from('waitlist')
    .update({ notified_at: claimedAt })
    .is('notified_at', null)
    .select('id, created_at, email, first_name, marketing_consent')
  if (error) throw error
  const rows = (data ?? []) as WaitlistRow[]
  if (!rows.length) return 'skipped: already claimed'
  rows.sort((a, b) => a.created_at.localeCompare(b.created_at))

  const { count: total } = await supabase.from('waitlist').select('id', { count: 'exact', head: true })

  const list = rows
    .map(
      (r) =>
        `<tr><td>${escape(r.first_name)}</td><td>${escape(r.email)}</td><td>${r.marketing_consent ? 'Yes' : 'No'}</td><td>${londonTime(r.created_at)}</td></tr>`,
    )
    .join('')

  try {
    await sendEmail({
      subject: `${rows.length} new waitlist sign-up${rows.length === 1 ? '' : 's'} (${label})`,
      html: layout(
        `${rows.length} new waitlist sign-up${rows.length === 1 ? '' : 's'}`,
        `<p>The waitlist now has <strong>${total ?? '—'}</strong> people in total.</p>
         <table cellpadding="8" style="border-collapse:collapse;width:100%">
           <tr style="text-align:left;color:#46546b"><th>First name</th><th>Email</th><th>Marketing consent</th><th>Joined</th></tr>
           ${list}
         </table>`,
      ),
    })
  } catch (err) {
    // Release the rows so the next batch or weekly summary picks them up.
    await supabase.from('waitlist').update({ notified_at: null }).eq('notified_at', claimedAt)
    throw err
  }
  return `sent: ${rows.length}`
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  if (req.headers.get('x-webhook-secret') !== env('WEBHOOK_SECRET')) {
    return new Response('Unauthorised', { status: 401 })
  }

  try {
    const { type, record } = await req.json()
    let result: string
    switch (type) {
      case 'care_enquiries':
        await notifyCare(record)
        result = 'sent'
        break
      case 'companion_interest':
        await notifyCompanion(record)
        result = 'sent'
        break
      case 'waitlist':
        await confirmWaitlist(record)
        result = 'sent'
        break
      case 'waitlist_batch':
        result = await notifyWaitlist(BATCH_SIZE, 'batch')
        break
      case 'waitlist_weekly':
        result = await notifyWaitlist(1, 'weekly summary')
        break
      default:
        return new Response(`Unknown type: ${type}`, { status: 400 })
    }
    return Response.json({ ok: true, result })
  } catch (err) {
    console.error(err)
    return Response.json({ ok: false, error: String(err) }, { status: 500 })
  }
})
