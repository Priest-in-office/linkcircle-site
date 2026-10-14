/**
 * Single integration point for every form on the site (waitlist, companion, care).
 * Sends submissions to LinkCircle's Supabase project through its REST API.
 *
 * Needs two environment variables (Cloudflare Pages → Settings → Variables and Secrets, and .env.local for dev):
 *   VITE_SUPABASE_URL       https://<project-ref>.supabase.co
 *   VITE_SUPABASE_ANON_KEY  the public anon / publishable key — never the service_role / secret key
 *
 * Throws on failure so the form can show an error instead of a false success.
 */
export type FormName = 'waitlist' | 'companion' | 'care'

/** Name of the hidden field real visitors never see. Bots that fill it are silently ignored. */
export const HONEYPOT_FIELD = 'website'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const text = (data: FormData, key: string) => {
  const value = String(data.get(key) ?? '').trim()
  return value === '' ? null : value
}

const email = (data: FormData) => text(data, 'email')?.toLowerCase() ?? null

/** Maps each form's field names to its table and columns. */
const targets: Record<FormName, { table: string; row: (d: FormData) => Record<string, unknown> }> = {
  waitlist: {
    table: 'waitlist',
    row: (d) => ({
      email: email(d),
      first_name: text(d, 'firstName'),
      marketing_consent: d.get('consent') === 'on',
    }),
  },
  companion: {
    table: 'companion_interest',
    row: (d) => ({ name: text(d, 'name'), email: email(d), offer: text(d, 'offer') }),
  },
  care: {
    table: 'care_enquiries',
    row: (d) => ({
      organisation: text(d, 'org'),
      contact_name: text(d, 'name'),
      email: email(d),
      organisation_type: text(d, 'type'),
      message: text(d, 'message'),
    }),
  },
}

export async function submitForm(form: FormName, data: FormData): Promise<void> {
  // Honeypot filled in: pretend it worked, store nothing.
  if (text(data, HONEYPOT_FIELD)) return

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Form backend is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
  }

  const { table, row } = targets[form]
  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal', // the public key can insert but not read back
  }
  // Legacy anon keys are JWTs and go in Authorization too; newer publishable keys (sb_publishable_…) don't.
  if (SUPABASE_KEY.startsWith('eyJ')) headers.Authorization = `Bearer ${SUPABASE_KEY}`

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(row(data)),
  })

  // 409 on the waitlist means this email has already joined — that's still a success for the visitor.
  if (res.ok || (form === 'waitlist' && res.status === 409)) return

  throw new Error(`Submission failed (${res.status}): ${await res.text()}`)
}
