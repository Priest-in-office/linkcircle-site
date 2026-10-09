export const hero = {
  badge: 'Launching soon across the UK',
  titleLines: ['Real People.', 'Real Conversations.'],
  lede: 'Meaningful conversation and companionship through video or audio calls — whenever you need someone to talk to.',
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
