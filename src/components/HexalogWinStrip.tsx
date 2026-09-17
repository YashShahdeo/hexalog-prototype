import { Link2 } from 'lucide-react'
import { HEXALOG_WINS } from '../data/hexalogStory'

/**
 * "Why this wins for Hexalog" — three tiles anchoring the prototype to Hexalog's own
 * public numbers and words. tone='dark' for the WhyWorkflow gradient screen,
 * tone='light' for the Roadmap & ROI screen. Tiles with a verified source href
 * render as one-click verifiable links.
 */
export function HexalogWinStrip({ tone }: { tone: 'dark' | 'light' }) {
  const isDark = tone === 'dark'

  return (
    <section className="mt-9">
      <div className="flex items-center gap-2">
        <Link2 size={14} className={isDark ? 'text-soft-yellow' : 'text-brand-purple'} />
        <h2
          className={`text-[12px] font-bold uppercase tracking-[0.18em] ${
            isDark ? 'text-soft-yellow' : 'text-brand-purple'
          }`}
        >
          Why this wins for Hexalog
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {HEXALOG_WINS.map((win) => {
          const cardClass = isDark
            ? 'rounded-card border border-white/10 bg-white/5 p-5 backdrop-blur-sm'
            : 'rounded-card border border-ink-900/8 bg-white p-5 shadow-card'
          const body = (
            <>
              <p
                className={
                  isDark
                    ? 'text-[19px] font-extrabold leading-snug tracking-tight text-white'
                    : 'text-[19px] font-extrabold leading-snug tracking-tight text-brand-purple'
                }
              >
                {win.stat}
              </p>
              <p
                className={`mt-1.5 text-[10.5px] font-bold uppercase tracking-widest ${
                  isDark ? 'text-white/50' : 'text-ink-400'
                }`}
              >
                {win.statLabel}
              </p>
              <p
                className={`mt-2.5 text-[12.5px] leading-relaxed ${
                  isDark ? 'text-white/75' : 'text-ink-600'
                }`}
              >
                {win.connection}
              </p>
              {win.href && (
                <p
                  className={`mt-2.5 text-[11px] font-semibold underline decoration-dotted underline-offset-2 ${
                    isDark ? 'text-soft-yellow/80' : 'text-brand-violet'
                  }`}
                >
                  Verify on hexalog.in →
                </p>
              )}
            </>
          )

          return win.href ? (
            <a
              key={win.statLabel}
              href={win.href}
              target="_blank"
              rel="noreferrer"
              className={`${cardClass} block transition-transform hover:-translate-y-0.5`}
            >
              {body}
            </a>
          ) : (
            <div key={win.statLabel} className={cardClass}>
              {body}
            </div>
          )
        })}
      </div>
    </section>
  )
}
