import { brand } from '../../content/site'
import { logo } from '../../content/media'

const sizes = {
  sm: { emblem: 36, wordmark: 21, gap: 10 },
  md: { emblem: 44, wordmark: 26, gap: 12 },
}

/** Emblem + wordmark lockup. */
export function Logo({ size = 'sm' }: { size?: keyof typeof sizes }) {
  const s = sizes[size]
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: s.gap }}>
      <img src={logo.emblem} alt="" width={s.emblem} height={s.emblem} />
      <img src={logo.wordmark} alt={brand.name} style={{ height: s.wordmark, width: 'auto' }} />
    </span>
  )
}
