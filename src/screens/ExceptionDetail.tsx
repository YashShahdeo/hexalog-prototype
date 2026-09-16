import { ArrowLeft, ArrowRight, Link2, ShieldAlert } from 'lucide-react'
import { EXCEPTIONS } from '../data/exceptions'
import { Badge, SlaRiskBadge } from '../components/Badge'
import type { Exception } from '../types'

function EvidenceRow({ index, label, value, source }: { index: number; label: string; value: string; source: string }) {
  return (
    <li className="flex gap-3.5">
      <span className="data mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-[11px] font-bold text-brand-purple">
        {index}
      </span>
      <div className="min-w-0 flex-1 rounded-card border border-ink-900/8 bg-white px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10.5px] font-bold uppercase tracking-widest text-ink-400">{label}</p>
          <p className="shrink-0 text-[10.5px] font-semibold text-brand-violet">source: {source}</p>
        </div>
        <p className="mt-1 text-[13.5px] leading-snug text-ink-900">{value}</p>
      </div>
    </li>
  )
}

export function ExceptionDetail({
  exceptionId,
  onBack,
  onOpenAgents,
  onOpenApproval,
}: {
  exceptionId: string
  onBack: () => void
  onOpenAgents: () => void
  onOpenApproval: () => void
}) {
  const exception = EXCEPTIONS.find((e) => e.id === exceptionId) ?? EXCEPTIONS[0]
  const e: Exception = exception

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-600 transition-colors hover:text-brand-purple"
      >
        <ArrowLeft size={14} /> Back to ledger
      </button>

      {/* Header */}
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="data text-[22px] font-bold text-brand-purple">{e.id}</h1>
            <Badge kind="status" value={e.status} size="xs" />
          </div>
          <p className="mt-1 text-[15px] font-semibold text-ink-900">{e.title}</p>
          <p className="mt-0.5 text-[13px] text-ink-600">
            <span className="data">{e.shipmentId}</span> · {e.route}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <SlaRiskBadge risk={e.slaRisk} />
          <Badge kind="severity" value={e.severity} size="xs" />
        </div>
      </header>

      {/* Summary strip */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-card border border-ink-900/8 bg-white p-4 shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Likely root cause</p>
          <p className="mt-1.5 text-[12.5px] font-medium leading-snug text-ink-900">{e.rootCause}</p>
        </div>
        <div className="rounded-card border border-ink-900/8 bg-white p-4 shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Confidence</p>
          <p className="data mt-1.5 text-[24px] font-bold leading-none text-brand-purple">{e.confidence}%</p>
          <p className="mt-1.5 text-[11px] text-ink-600">evidence-backed, see trail →</p>
        </div>
        <div className="rounded-card border border-ink-900/8 bg-white p-4 shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">SLA impact</p>
          <p className="mt-1.5 text-[13px] font-bold text-[#B03030]">{e.businessImpact.slaStatus}</p>
          <p className="mt-1.5 text-[11px] text-ink-600">
            predicted delay <span className="data">{e.businessImpact.predictedDelayRange}</span>
          </p>
        </div>
        <div className="rounded-card border border-ink-900/8 bg-white p-4 shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Next step</p>
          <p className="mt-1.5 text-[12.5px] font-medium leading-snug text-ink-900">{e.nextStep}</p>
        </div>
      </div>

      {/* Two-column: evidence + plan | impact */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-5">
        <div>
          {/* Evidence trail */}
          <section>
            <h2 className="mb-3 text-[15px] font-bold text-ink-900">Evidence trail</h2>
            <ol className="flex flex-col gap-2.5">
              {e.evidenceTrail.map((ev, i) => (
                <EvidenceRow key={i} index={i + 1} label={ev.label} value={ev.value} source={ev.source} />
              ))}
            </ol>
          </section>

          {/* Resolution plan */}
          <section className="mt-7">
            <h2 className="mb-3 text-[15px] font-bold text-ink-900">Recommended resolution plan</h2>
            <div className="overflow-hidden rounded-card border border-ink-900/8 bg-white shadow-card">
              {e.resolutionPlan.map((step, i) => (
                <div
                  key={step.step}
                  className={`flex items-center gap-3.5 px-5 py-3.5 ${
                    i < e.resolutionPlan.length - 1 ? 'border-b border-ink-900/6' : ''
                  }`}
                >
                  <span className="data text-[12px] font-bold text-ink-400">{String(step.step).padStart(2, '0')}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-medium text-ink-900">{step.action}</p>
                    <p className="mt-0.5 text-[11.5px] text-ink-600">Owner: {step.owner}</p>
                  </div>
                  <Badge kind="autonomy" value={step.autonomy} size="xs" />
                  <button
                    onClick={onOpenApproval}
                    title="Proceed to approval"
                    className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-soft-lavender hover:text-brand-purple"
                  >
                    <Link2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Autonomy policy footnote */}
            <p className="mt-3 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-ink-600">
              <ShieldAlert size={13} className="mt-0.5 shrink-0 text-brand-violet" />
              Autonomy policy: low-risk actions can execute automatically; regulatory and customer-impacting
              actions always require human approval.
            </p>
          </section>
        </div>

        {/* Business impact — dark panel */}
        <aside>
          <div className="sticky top-6 rounded-card bg-navy p-5 shadow-elevated">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/50">Business impact</h2>
            <dl className="mt-4 flex flex-col gap-4">
              {[
                { label: 'Current delay', value: `${e.businessImpact.currentDelayHours}h` },
                { label: 'Predicted delay', value: e.businessImpact.predictedDelayRange },
                { label: 'Shipment value', value: e.businessImpact.shipmentValue },
                { label: 'SLA status', value: e.businessImpact.slaStatus, highlight: true },
                { label: 'Estimated operational cost', value: e.businessImpact.estimatedCost },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-white/45">{row.label}</dt>
                  <dd
                    className={`data mt-0.5 text-[15px] font-semibold ${
                      row.highlight ? 'text-soft-red' : 'text-white'
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 border-t border-white/10 pt-4">
              <button
                onClick={onOpenAgents}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-soft-yellow px-4 py-2.5 text-[13px] font-bold text-brand-darkest transition-transform hover:scale-[1.01]"
              >
                View agent orchestration
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-2.5 text-center text-[10.5px] leading-relaxed text-white/45">
                How the six agents produced this analysis →
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
