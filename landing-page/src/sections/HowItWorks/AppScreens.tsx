import { Icon } from '../../components/Icon/Icon'
import { StatusBar } from '../../components/Phone/Phone'
import { Photo } from '../../components/Photo/Photo'
import { appMock } from '../../content/howItWorks'
import { media } from '../../content/media'
import { cx } from '../../lib/cx'
import styles from './AppScreens.module.css'

const { explore, book, connect } = appMock

export function ExploreScreen() {
  return (
    <div className={styles.screen}>
      <StatusBar />
      <span className={styles.screenTitle}>Explore</span>
      <div className={styles.search}>{explore.searchPlaceholder}</div>
      <div className={styles.chips}>
        {explore.filters.map((f, i) => (
          <span key={f} className={cx(styles.chip, i === 0 && styles.chipActive)}>
            {f}
          </span>
        ))}
      </div>
      <div className={styles.list}>
        {explore.companions.map((c) => (
          <div key={c.name} className={styles.row}>
            <div className={styles.avatar}>
              <Photo shape="circle" fallback={c.name[0]} />
            </div>
            <div className={styles.rowText}>
              <div className={styles.name}>{c.name}</div>
              <div className={styles.meta}>{c.interests}</div>
              <div className={styles.availability}>{c.availability}</div>
            </div>
            <div className={styles.price}>{c.price}</div>
          </div>
        ))}
      </div>
      <div className={styles.tabs}>
        {explore.tabs.map((t, i) => (
          <span key={t} className={cx(i === 0 && styles.tabActive)}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function BookScreen() {
  return (
    <div className={styles.screen}>
      <StatusBar />
      <div className={styles.bookHeader}>
        <div className={styles.bookAvatar}>
          <Photo shape="circle" fallback={book.companion.name[0]} />
        </div>
        <div>
          <div className={styles.bookTitle}>Book {book.companion.name}</div>
          <div className={styles.meta}>{book.companion.interests}</div>
        </div>
      </div>

      <div className={styles.label} style={{ marginTop: '6cqw' }}>
        Call type
      </div>
      <div className={styles.toggle}>
        {book.callTypes.map((t, i) => (
          <span key={t} className={cx(i === 0 && styles.toggleActive)}>
            {t}
          </span>
        ))}
      </div>

      <div className={styles.label}>Choose a day</div>
      <div className={styles.days}>
        {book.days.map((d, i) => (
          <span key={d.date} className={cx(styles.day, i === book.selectedDay && styles.dayActive)}>
            {d.day}
            <b>{d.date}</b>
          </span>
        ))}
      </div>

      <div className={styles.label}>Available times</div>
      <div className={styles.times}>
        {book.times.map((t, i) => (
          <span key={t} className={cx(styles.time, i === book.selectedTime && styles.timeActive)}>
            {t}
          </span>
        ))}
      </div>

      <div className={styles.summary}>
        <span>{book.summary}</span>
        <b>{book.price}</b>
      </div>
      <div className={styles.pay}>
        <Icon name="lock" size="4.4cqw" strokeWidth={2} />
        {book.action}
      </div>
    </div>
  )
}

export function ConnectScreen() {
  const [secondary, primary] = connect.actions
  return (
    <div className={styles.connect}>
      <div className={styles.connectMedia}>
        <Photo media={media.connectRemote} />
      </div>
      <StatusBar overlay />
      <div className={styles.sheet}>
        <span className={styles.sheetStatus}>{connect.status}</span>
        <span className={styles.sheetQuestion}>{connect.question}</span>
        <div className={styles.sheetActions}>
          <span>{secondary}</span>
          <span className={styles.primaryAction}>{primary}</span>
        </div>
      </div>
    </div>
  )
}
