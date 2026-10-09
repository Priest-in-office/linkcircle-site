export const howItWorks = {
  eyebrow: 'How it works',
  title: 'Three simple steps.',
  steps: [
    { title: 'Explore', body: 'Browse companions by interests, availability and price.' },
    { title: 'Book', body: 'Choose a time, video or audio, pay securely.' },
    { title: 'Connect', body: 'Talk through LinkCircle, then leave feedback or book again.' },
  ],
}

/** Sample data rendered inside the phone mock-up screens. */
export const appMock = {
  explore: {
    searchPlaceholder: 'Search interests',
    filters: ['All', 'Books', 'Music', 'Garden'],
    companions: [
      { name: 'Helen', interests: 'Books · Crosswords', availability: 'Available today', price: '£12' },
      { name: 'Ade', interests: 'Football · Cooking', availability: 'Evenings', price: '£10' },
      { name: 'Priya', interests: 'Music · Travel', availability: 'Weekends', price: '£14' },
    ],
    tabs: ['Explore', 'Bookings', 'Messages', 'Profile'],
  },
  book: {
    companion: { name: 'Helen', interests: 'Books · Crosswords' },
    callTypes: ['Video', 'Audio'],
    days: [
      { day: 'Mon', date: 12 },
      { day: 'Tue', date: 13 },
      { day: 'Wed', date: 14 },
      { day: 'Thu', date: 15 },
      { day: 'Fri', date: 16 },
    ],
    selectedDay: 1,
    times: ['10:00', '11:30', '14:00', '15:30', '17:00', '18:30'],
    selectedTime: 2,
    summary: '30 min video call',
    price: '£12',
    action: 'Pay securely',
  },
  connect: {
    status: 'Call ended · 30 min',
    question: 'How was your conversation with Helen?',
    actions: ['Leave feedback', 'Book again'],
  },
}
