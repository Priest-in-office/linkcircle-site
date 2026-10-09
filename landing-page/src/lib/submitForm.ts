/**
 * Single integration point for every form on the site (waitlist, companion, care).
 * There is no backend yet — wire the real endpoint here and all forms pick it up.
 */
export type FormName = 'waitlist' | 'companion' | 'care'

export async function submitForm(form: FormName, data: FormData): Promise<void> {
  if (import.meta.env.DEV) {
    console.info(`[submitForm] ${form}`, Object.fromEntries(data))
  }
}
