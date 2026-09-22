import { ArrowRight, Check, X } from 'lucide-react'
import { HexMark } from '../components/HexMark'
import { HexalogWinStrip } from '../components/HexalogWinStrip'
import { AuthorFooter } from '../components/AuthorFooter'

const TODAY_STEPS = [
  'Exception occurs',
  'Ops notices (often late)',
  'Search multiple systems',
  'Identify cause',
  'Contact stakeholders',
  'Decide action',
  'Execute + follow up',
]

const PROPOSED_STEPS = [
  'AI detects',
  'AI investigates',
  'AI explains cause',
  'AI calculates impact',
  'AI proposes resolution',
  'Human approves',
  'AI executes',
  'AI verifies',
]

function FlowLine({ steps, tone }: { steps: string[]; tone: 'today' | 'proposed' }) {
  const isToday = tone === 'today'
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center">
          <span
            className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium ${
              isToday
                ? 'border border-ink-900/10 bg-white text-ink-600'
                : i === 5 // human step
                  ? 'bg-navy text-white'
                  : 'bg-brand-purple/1 border border-brand-purple text-white'
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className={`mx-1.5 text-[11px] ${isToday ? 'text-ink-400' : 'text-brand-violet'}`}>→</span>
          )}
        </span>
      ))}
    </div>
  )
}

export function WhyWorkflow({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-darkest via-brand-deep to-[#1B0E38]">
      <div className="flex min-h-screen flex-col px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-8 flex items-center gap-2.5 text-white">
          <HexMark size={26} />
          <span className="text-[18px] font-bold tracking-tight">hexalog</span>
          <span className="ml-2 rounded-full border border-white/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
            Concept prototype
          </span>
        </div>

        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-soft-yellow">
          Why this workflow
        </p>
        <h1 className="mt-3 text-[38px] font-extrabold leading-[1.12] tracking-tight text-white">
          Exception resolution is where cross-border logistics loses its time - and where AI can earn it back.
        </h1>

        <p className="mt-6 text-[15.5px] leading-relaxed text-white/75">
          Cross-border shipments generate exceptions at every stage - a missing customs document, an HS code
          mismatch, a carrier delay, port congestion. Today, resolving one means a person manually checking
          tracking, customs portals, document stores and carrier feeds, diagnosing the cause, coordinating the
          right party, and following up until closed. The pattern -{' '}
          <span className="text-white">Event → Exception → Investigation → Decision → Coordination → Resolution</span>{' '}
          - is repetitive, structured, and measurable. That makes it a strong candidate for progressive agentic
          automation.
        </p>

        <div className="mt-9 rounded-card border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-soft-red">
            <X size={13} /> Today
          </div>
          <div className="mt-3">
            <FlowLine steps={TODAY_STEPS} tone="today" />
          </div>

          <div className="my-5 h-px bg-white/10" />

          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#9be29b]">
            <Check size={13} /> Proposed
          </div>
          <div className="mt-3">
            <FlowLine steps={PROPOSED_STEPS} tone="proposed" />
          </div>
        </div>

        <p className="mt-7 border-l-2 border-soft-yellow pl-4 text-[14px] italic leading-relaxed text-white/80">
          Hypothesis, not claim: a large class of logistics exceptions can be progressively automated because they
          follow repeatable investigation and resolution patterns - while risk-sensitive actions remain
          human-controlled.
        </p>

        <p className="mt-4 text-[13px] leading-relaxed text-white/70">
          <span className="font-semibold text-white">Scope:</span> this prototype goes deep on one class - customs
          DOC_HOLD on the India–China and India–Middle East lanes, the corridors Hexalog runs today. The same
          pattern extends to Vietnam, Thailand and Oceania as those lanes open.
        </p>

        <p className="mt-4 text-[13px] leading-relaxed text-white/70">
          <span className="font-semibold text-white">The hook:</span> Hexalog's own last-mile product page already
          lists “Manage forward, return, and exception flows in real time” as a dashboard capability. This is what
          that promise looks like when agents run the exception leg.
        </p>

        <HexalogWinStrip tone="dark" />

        <div className="mt-9">
          <button
            onClick={onEnter}
            className="group inline-flex items-center gap-2 rounded-full bg-soft-yellow px-6 py-3 text-[14.5px] font-bold text-brand-darkest transition-transform hover:scale-[1.02]"
          >
            Enter Control Tower
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <p className="mt-10 text-[11.5px] leading-relaxed text-white/45">
          Independent concept built from publicly available information about Hexalog's cross-border logistics
          platform. Not built with inside access to Hexalog's systems or data. All shipment IDs, metrics and
          simulation results shown are illustrative/synthetic. Positioned as a resolution layer for Hexalog's
          cross-border orchestration platform (hexalog.in).
        </p>
        <AuthorFooter dark />
        <p className="mt-3 text-[11.5px] font-medium text-white/60">
          Assumptions &amp; what I don't know → see the Assumptions badge in the header of every screen.
        </p>
      </div>
    </div>
  )
}
