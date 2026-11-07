export const hero = {
  badge: 'Launching soon across the UK',
  titleLines: ['Real People.', 'Real Conversations.', 'On Your Terms.'],
  lede: 'Discover people who share your interests, choose a time that suits you, and enjoy friendly video or audio conversations in a welcoming environment.',
  /** Which call screen the hero phone shows. */
  callMode: 'video' as 'video' | 'audio',
  call: { name: 'Sam', duration: '12:04' },
}

export const highlights = [
  { label: 'Video calls', icon: 'video' },
  { label: 'Audio calls', icon: 'mic' },
  { label: 'Real people', icon: 'person' },
  { label: 'Secure booking at launch', icon: 'lock' },
] as const
