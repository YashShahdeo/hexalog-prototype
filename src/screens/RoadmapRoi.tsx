import { Flag, TrendingUp, CalendarClock, Compass } from 'lucide-react'
import { StepTracker } from '../components/StepTracker'
import { NORTH_STAR, ROADMAP_PHASES, VALUE_LEVERS, FIRST_TWO_WEEKS, CLOSING_CONDITION } from '../data/roadmap'
import { NETWORK_ROLLUP, SIMULATED_MATH_NOTE } from '../data/hexalogStory'
import { HexalogWinStrip } from '../components/HexalogWinStrip'
import { SimulatedDataBanner } from '../components/SimulatedDataNote'
import { AuthorFooter } from '../components/AuthorFooter'

export function RoadmapRoi() {
  return (
    <div className="pt-6 pb-6 sm:px-6 lg:px-8">
      <StepTracker current="roadmap" />
      <header className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink-900">Roadmap & ROI</h1>
        <p className="mt-1 text-[13.5px] text-ink-600">
          From observing exceptions to resolving them autonomously - every phase tied to measurable value.
        </p>
      </header>

      {/* North Star banner - white card, gold accent flag (PRD: 1-2 gold uses max) */}
      <div className="mb-7 rounded-card border border-ink-900/8 bg-white px-6 py-5 shadow-card">
        <div className="flex items-center gap-2">
          <Flag size={15} className="text-soft-yellow" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-purple">North Star</span>
        </div>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-[22px] font-bold text-ink-900">{NORTH_STAR.metric}</p>
          <p className="data text-[22px] font-bold text-brand-purple">{NORTH_STAR.target}</p>
        </div>
        <p className="mt-1.5 text-[12.5px] text-ink-600">{NORTH_STAR.definition}</p>
      </div>

      {/* Network roll-up - the one-number business case (simulated) */}
      <section className="mb-7 overflow-hidden rounded-card border border-brand-purple/15 bg-white shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-soft-lavender/60 px-6 py-3">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink-900">Network roll-up - the business case</h2>
          <span className="data text-[11px] font-semibold text-brand-purple">{NETWORK_ROLLUP.basis}</span>
        </div>
        <div className="grid grid-cols-1 divide-y divide-ink-900/6 border-b border-ink-900/6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {NETWORK_ROLLUP.stats.map((s) => (
            <div key={s.label} className="px-6 py-5">
              <p className="data text-[30px] font-bold leading-none text-brand-purple">
                {s.value}
                {s.unit && <span className="ml-0.5 text-[17px] text-ink-600">{s.unit}</span>}
              </p>
              <p className="mt-2 text-[12.5px] font-semibold text-ink-900">{s.label}</p>
              <p className="mt-0.5 text-[11px] text-ink-600">{s.detail}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 divide-y divide-ink-900/6 bg-[#FCFBFE] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {NETWORK_ROLLUP.secondary.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2 px-6 py-3">
              <span className="data text-[17px] font-bold text-ink-900">{s.value}</span>
              <span className="text-[12px] text-ink-600">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-3">
          <SimulatedDataBanner text={SIMULATED_MATH_NOTE} />
          <div className="mt-2 flex flex-col gap-1 text-[11px] leading-relaxed text-ink-600">
            <p>
              <span className="font-bold uppercase tracking-wide text-[#8A6D0A]">Assumption</span> · ₹1,800/hr
              blended ops cost - to be replaced in Week 1 by actual loaded cost from Finance.
            </p>
            <p>
              <span className="font-bold uppercase tracking-wide text-[#8A6D0A]">Assumption</span> · 2.9h median
              handling per exception - to be replaced in Week 1 by time-and-motion shadowing of 2–3 control
              tower executives.
            </p>
          </div>
          <p className="mt-2 border-t border-ink-900/6 pt-2 text-[11.5px] font-medium leading-relaxed text-ink-900">
            This is the exception-handling spine of the AI logistics assistant the seed round funds - and it
            ports lane-by-lane as Middle East and Southeast Asia open.
          </p>
        </div>
      </section>

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

      {/* Why this wins for Hexalog - pitch bookends the walkthrough */}
      <HexalogWinStrip tone="light" />

      {/* Closing success condition */}
      <div className="mt-7 flex items-center justify-center gap-2.5 rounded-card border border-brand-purple/20 bg-soft-lavender px-6 py-4">
        <Compass size={16} className="text-brand-purple" />
        <p className="text-[14px] font-semibold italic text-brand-deep">{CLOSING_CONDITION}</p>
      </div>

      <AuthorFooter />
    </div>
  )
}
