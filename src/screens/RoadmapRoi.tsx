import { Flag, TrendingUp, CalendarClock, Compass } from 'lucide-react'
import { NORTH_STAR, ROADMAP_PHASES, VALUE_LEVERS, FIRST_TWO_WEEKS, CLOSING_CONDITION } from '../data/roadmap'

export function RoadmapRoi() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink-900">Roadmap & ROI</h1>
        <p className="mt-1 text-[13.5px] text-ink-600">
          From observing exceptions to resolving them autonomously — every phase tied to measurable value.
        </p>
      </header>

      {/* North Star banner */}
      <div className="mb-7 rounded-card bg-navy px-6 py-5 shadow-elevated">
        <div className="flex items-center gap-2">
          <Flag size={15} className="text-soft-yellow" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-soft-yellow">North Star</span>
        </div>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-[22px] font-bold text-white">{NORTH_STAR.metric}</p>
          <p className="data text-[22px] font-bold text-soft-yellow">{NORTH_STAR.target}</p>
        </div>
        <p className="mt-1.5 text-[12.5px] text-white/55">{NORTH_STAR.definition}</p>
      </div>

      {/* Progressive autonomy phases */}
      <section className="mb-7">
        <h2 className="mb-3 text-[15px] font-bold text-ink-900">Progressive autonomy</h2>
        <div className="grid grid-cols-5 gap-3">
          {ROADMAP_PHASES.map((p) => (
            <div
              key={p.phaseNumber}
              className="flex flex-col rounded-card border border-ink-900/8 bg-white p-4 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="data text-[11px] font-bold text-brand-violet">0{p.phaseNumber}</span>
                <span className="rounded-full bg-soft-lavender px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-brand-purple">
                  {p.timeframe}
                </span>
              </div>
              <p className="mt-2 text-[14.5px] font-bold text-ink-900">{p.name}</p>
              <p className="mt-1.5 flex-1 text-[11.5px] leading-relaxed text-ink-600">{p.description}</p>
              <p className="mt-3 border-t border-ink-900/6 pt-2.5 text-[11px] font-medium leading-snug text-brand-purple">
                {p.businessValue}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Value levers + first 2 weeks */}
      <div className="grid grid-cols-2 gap-5">
        <section className="rounded-card border border-ink-900/8 bg-white p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-ink-900">
            <TrendingUp size={15} className="text-success" /> Value levers
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {VALUE_LEVERS.map((v) => (
              <div key={v.capability} className="flex items-center justify-between gap-4 border-b border-ink-900/6 pb-3 last:border-b-0 last:pb-0">
                <p className="text-[13px] font-medium text-ink-900">{v.capability}</p>
                <p className="shrink-0 text-[12px] font-semibold text-success">{v.metric}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-card border border-ink-900/8 bg-white p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-ink-900">
            <CalendarClock size={15} className="text-brand-purple" /> First 2 weeks
          </h2>
          <ol className="mt-4 flex flex-col gap-3">
            {FIRST_TWO_WEEKS.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="data mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-[10.5px] font-bold text-brand-purple" style={{ height: 22, width: 22 }}>
                  {i + 1}
                </span>
                <p className="text-[12.5px] leading-relaxed text-ink-900">{item}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Closing success condition */}
      <div className="mt-7 flex items-center justify-center gap-2.5 rounded-card border border-brand-purple/20 bg-soft-lavender px-6 py-4">
        <Compass size={16} className="text-brand-purple" />
        <p className="text-[14px] font-semibold italic text-brand-deep">{CLOSING_CONDITION}</p>
      </div>
    </div>
  )
}
