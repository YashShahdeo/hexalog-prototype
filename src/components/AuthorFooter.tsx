import { AUTHOR } from '../data/hexalogStory'

/**
 * One-line attribution footer, shown on every screen. docUrl/linkedin/portfolio
 * render as links only when non-empty - a placeholder never ships as a dead link.
 */
export function AuthorFooter({ dark = false }: { dark?: boolean }) {
  const docUrl = AUTHOR.docUrl as string
  const linkedin = AUTHOR.linkedin as string
  const portfolio = AUTHOR.portfolio as string

  return (
    <p
      className={`mt-8 text-[11px] leading-relaxed ${
        dark ? 'text-white/45' : 'text-ink-400'
      }`}
    >
      Concept prototype by <span className={dark ? 'text-white/80' : 'text-ink-600'}>{AUTHOR.name}</span> ·{' '}
      <a
        href={`mailto:${AUTHOR.email}`}
        className={`underline decoration-dotted underline-offset-2 transition-colors ${
          dark ? 'text-white/60 hover:text-white' : 'hover:text-brand-purple'
        }`}
      >
        {AUTHOR.email}
      </a>
      {linkedin && (
        <>
          {' · '}
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className={`underline decoration-dotted underline-offset-2 transition-colors ${
              dark ? 'text-white/60 hover:text-white' : 'hover:text-brand-purple'
            }`}
          >
            LinkedIn
          </a>
        </>
      )}
      {portfolio && (
        <>
          {' · '}
          <a
            href={portfolio}
            target="_blank"
            rel="noreferrer"
            className={`underline decoration-dotted underline-offset-2 transition-colors ${
              dark ? 'text-white/60 hover:text-white' : 'hover:text-brand-purple'
            }`}
          >
            Portfolio
          </a>
        </>
      )}
      {docUrl && (
        <>
          {' · '}
          <a
            href={docUrl}
            target="_blank"
            rel="noreferrer"
            className={`underline decoration-dotted underline-offset-2 transition-colors ${
              dark ? 'text-white/60 hover:text-white' : 'hover:text-brand-purple'
            }`}
          >
            Read the full reasoning doc →
          </a>
        </>
      )}
    </p>
  )
}
