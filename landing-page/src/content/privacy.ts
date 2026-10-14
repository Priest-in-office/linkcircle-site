/**
 * Privacy notice copy.
 *
 * DRAFT — written from what the site actually collects today. It is NOT legal advice and must be
 * reviewed and approved by Emmanuel or LinkCircle's solicitor before launch. Text in [[double
 * brackets]] is a fact only they can supply; it renders highlighted on the page so it can't ship
 * unnoticed. When the notice is approved, fill every placeholder and set `reviewed: true` to
 * remove the draft banner.
 */
import { brand } from './site'

export const privacy = {
  reviewed: false,
  title: 'Privacy Policy',
  lastUpdated: '[[date approved]]',
  draftNotice:
    'This privacy notice is a draft and is awaiting legal review. Highlighted items are still to be confirmed.',

  sections: [
    {
      heading: 'Who we are',
      blocks: [
        `${brand.name} ("we", "us") is a service for conversation and companionship through video and audio calls. The data controller for the information described here is [[LINKCIRCLE LTD]], a company registered in [[England and Wales]] under number [[16958532]], registered office [[registered address]]. We are registered with the Information Commissioner's Office under number [[ICO registration number]].`,
        `If you have any questions about this notice or your information, email us at ${brand.email}.`,
      ],
    },
    {
      heading: 'What we collect on this website',
      blocks: [
        'We only collect the information you choose to give us through the forms on this site:',
        [
          'Waitlist: your email address, your first name (optional), and whether you agree to receive updates and marketing emails.',
          'Become a Companion: your name, email address and what you would like to offer.',
          'Care organisations: your organisation name, your name, work email address, organisation type and your message.',
        ],
        'This website does not ask for payment details and does not use analytics or advertising trackers.',
      ],
    },
    {
      heading: 'How we use it, and our lawful basis',
      blocks: [
        [
          'To send you one email confirming you have joined the waitlist, and to tell you when LinkCircle launches, because you asked us to by joining (legitimate interests).',
          'To send you updates and marketing emails, only if you ticked the box to agree (consent). You can withdraw consent at any time using the unsubscribe link in any email or by contacting us.',
          'To confirm we have received companion and care organisation enquiries, respond to them and arrange a conversation (legitimate interests, or steps taken at your request before entering into a contract).',
        ],
        'We will never sell your personal information.',
      ],
    },
    {
      heading: 'Who we share it with',
      blocks: [
        'We use a small number of service providers who process information on our behalf and only on our instructions:',
        [
          'Website hosting: Cloudflare (Cloudflare Pages).',
          'Form storage: Supabase, which stores what you send through our forms in London, UK.',
          'Email: Resend, which sends you a confirmation email when you submit a form and delivers a copy of each submission to our team inbox.',
          'Fonts: pages load typefaces from Google Fonts, which means your browser sends your IP address to Google when the page loads.',
        ],
        'Where a provider stores data outside the UK, we make sure appropriate safeguards are in place, such as the UK International Data Transfer Agreement or an adequacy decision.',
      ],
    },
    {
      heading: 'How long we keep it',
      blocks: [
        'We keep waitlist details until LinkCircle launches and for [[retention period]] afterwards, or until you ask us to remove them. Enquiry details are kept for [[retention period]] after our last contact with you.',
      ],
    },
    {
      heading: 'Cookies',
      blocks: ['This website does not set any cookies of its own.'],
    },
    {
      heading: 'Your rights',
      blocks: [
        'Under UK data protection law you have the right to access your information, to have it corrected or deleted, to restrict or object to how we use it, to data portability, and to withdraw consent at any time.',
        `To use any of these rights, email ${brand.email}. We will respond within one month.`,
        "If you are unhappy with how we have handled your information, you can complain to the Information Commissioner's Office at ico.org.uk or by calling 0303 123 1113.",
      ],
    },
    {
      heading: 'Changes to this notice',
      blocks: ['If we change this notice we will update the date at the top of this page.'],
    },
  ] satisfies { heading: string; blocks: Array<string | string[]> }[],
}
