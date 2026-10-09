import { Section } from '../../components/Section/Section'
import { privacy } from '../../content/privacy'
import styles from './PrivacyPolicy.module.css'

/** Renders text, highlighting any [[placeholder]] still awaiting a real value. */
function Text({ children }: { children: string }) {
  return children.split(/(\[\[.+?\]\])/).map((part, i) =>
    part.startsWith('[[') ? (
      <mark key={i} className={styles.placeholder}>
        {part.slice(2, -2)}
      </mark>
    ) : (
      part
    ),
  )
}

export function PrivacyPolicy() {
  return (
    <Section tone="white" className={styles.policy}>
      <article className={styles.article}>
        <h1 className={styles.title}>{privacy.title}</h1>
        <p className={styles.updated}>
          Last updated: <Text>{privacy.lastUpdated}</Text>
        </p>
        {!privacy.reviewed && (
          <p role="note" className={styles.draft}>
            {privacy.draftNotice}
          </p>
        )}

        {privacy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.blocks.map((block, i) =>
              typeof block === 'string' ? (
                <p key={i} className={styles.paragraph}>
                  <Text>{block}</Text>
                </p>
              ) : (
                <ul key={i} className={styles.list}>
                  {block.map((item) => (
                    <li key={item}>
                      <Text>{item}</Text>
                    </li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}
      </article>
    </Section>
  )
}
