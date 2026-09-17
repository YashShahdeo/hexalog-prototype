import { ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react'
import { StepTracker } from '../components/StepTracker'
import { AuthorFooter } from '../components/AuthorFooter'
import { EXCEPTIONS } from '../data/exceptions'
import { Badge, SlaRiskBadge } from '../components/Badge'
import { Button } from '../components/Button'
import type { Exception, WorkingCapitalImpact } from '../types'

/** Production-integration context for each evidence source — hover for the honest status. */
const SOURCE_NOTES: Record<string, string> = {
  'customs feed': 'EDI / customs portal feed in production — integration assumed, to be confirmed Week 1',
  'platform document store': 'Existing platform document store — assumed accessible via internal API',
  'platform reverse-logistics module': 'Existing platform reverse-logistics data — assumed accessible via internal API',
  'VAC inspection log': 'Value-Add Centre inspection records — presumed live; Hexalog operates 6+ VACs',
  'address service': 'Geocoding / address validation service — third-party, integration assumed',
  'finance system': 'Client ledger / finance system — assumed accessible via internal API',
  'carrier API': 'Carrier milestone API — Hexalog already surfaces real-time tracking, so this feed is presumed live',
  'port data feed': 'Port congestion / schedule data — third-party feed, integration assumed',
  'Hexalog partner network': 'Partner-network quoting API — assumed via platform integrations',
  'classification rules': 'Classification rule engine — a Phase 2 build item; logic shown is illustrative',
  'tariff table': 'HS tariff reference data — static, low integration risk',
  '~1,800 historical cases': 'Synthetic case history built for this prototype — would be replaced by 4–6 weeks of real exception records',
  'comms log': 'Email / portal communication log — integration assumed',
  'warehouse WMS': 'WMS scan events — Hexalog operates VACs with 99.5% inventory accuracy, so scan data is presumed live',
  'last-mile app': 'Driver-app events — Hexalog already manages last-mile exception flows, so this feed is presumed live',
}
const DEFAULT_SOURCE_NOTE = 'Production system mapping is an assumption — to be confirmed in Week 1.'

function EvidenceRow({ index, label, value, source }: { index: number; label: string; value: string; source: string }) {
  return (
    <li className="flex gap-3.5">
      <span className="data mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-[11px] font-bold text-brand-purple">
        {index}
      </span>
      <div className="min-w-0 flex-1 rounded-card border border-ink-900/8 bg-white px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10.5px] font-bold uppercase tracking-widest text-ink-400">{label}</p>
          <p
            className="data-hover shrink-0 text-[10.5px] font-semibold text-brand-violet"
            title={SOURCE_NOTES[source] ?? DEFAULT_SOURCE_NOTE}
          >
            source: {source}
          </p>
        </div>
        <p className="mt-1 text-[13.5px] leading-snug text-ink-900">{value}</p>
      </div>
    </li>
  )
}

const SEGMENT_LABEL: Record<Exception['clientSegment'], string> = {
  msme_d2c: 'MSME · D2C',
  enterprise: 'Enterprise',
}

/** Working-capital framing — makes Hexalog's MSME thesis visible per exception. */
function WorkingCapitalCard({ wc }: { wc: WorkingCapitalImpact }) {
  return (
    <div className="rounded-card border border-brand-purple/20 bg-soft-lavender px-4 py-4">
      <p className="text-[11px] font-bold uppercase tracking-widest text-brand-purple">
        Working capital at stake
      </p>
      <p className="data mt-1.5 text-[17px] font-bold text-ink-900">{wc.lockedAmount}</p>
      <p className="mt-0.5 text-[11.5px] text-ink-600">locked · {wc.lockedSince}</p>
      <p className="mt-2 border-t border-brand-purple/10 pt-2 text-[11.5px] leading-relaxed text-ink-900">
        {wc.atRiskPromise}
      </p>
    </div>
  )
}

export function ExceptionDetail({
  exceptionId,
  onBack,
  onOpenAgents,
}: {
  exceptionId: string
  onBack: () => void
  onOpenAgents: () => void
}) {
  const exception = EXCEPTIONS.find((e) => e.id === exceptionId) ?? EXCEPTIONS[0]
  const e: Exception = exception

  return (      <div className="pt-6 pb-6 sm:px-6 lg:px-8">
        <StepTracker current="detail" />
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
          <span className="rounded-full border border-brand-purple/20 bg-brand-purple/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-purple">
            {SEGMENT_LABEL[e.clientSegment]}
          </span>
          <SlaRiskBadge risk={e.slaRisk} />
          <Badge kind="severity" value={e.severity} size="xs" />
        </div>
      </header>

      {/* Summary strip */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-card border border-ink-900/8 bg-white p-4 shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Likely root cause</p>
          <p className="mt-1.5 text-[12.5px] font-medium leading-snug text-ink-900">{e.rootCause}</p>
        </div>
        <div className="rounded-card border border-ink-900/8 bg-white p-4 shadow-card">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Confidence</p>
          <p className="data mt-1.5 text-[24px] font-bold leading-none text-brand-purple">{e.confidence}%</p>
          <p className="mt-1.5 text-[11px] text-ink-600">evidence-backed, see trail →</p>
          {e.wrongCost && (
            <p className="mt-2 border-t border-ink-900/6 pt-2 text-[10.5px] leading-snug text-ink-600">
              <span className="font-bold uppercase tracking-wide text-[#B03030]">If this is wrong:</span>{' '}
              {e.wrongCost}
            </p>
          )}
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
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {/* Evidence trail */}
          <section>
            <h2 className="mb-3 text-[15px] font-bold text-ink-900">Evidence trail</h2>
            {e.topNote && (
              <div className="mb-3 rounded-card border border-[#F0E1A0] bg-[#FDF6DC] px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A6D0A]">
                  Read this first — filing-accuracy framing
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#8A6D0A]">{e.topNote}</p>
              </div>
            )}
            <ol className="flex flex-col gap-2.5">
              {e.evidenceTrail.map((ev, i) => (
                <EvidenceRow key={i} index={i + 1} label={ev.label} value={ev.value} source={ev.source} />
              ))}
            </ol>
          </section>

          {/* Resolution plan */}
          <section className="mt-7">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-[15px] font-bold text-ink-900">Recommended resolution plan</h2>
              <Button onClick={onOpenAgents}>
                Run agents <ArrowRight size={14} />
              </Button>
            </div>
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
                </div>
              ))}
            </div>

            {/* Autonomy policy footnote */}
            <p className="mt-3 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-ink-600">
              <ShieldAlert size={13} className="mt-0.5 shrink-0 text-brand-violet" />
              Autonomy policy: low-risk actions can execute automatically; regulatory and customer-impacting
              actions always require human approval — executed on top of Hexalog's orchestration platform (assumed integration — see Assumptions).
            </p>

            {/* Guided next step */}
            <div className="mt-6 flex items-center justify-end">
              <Button size="lg" onClick={onOpenAgents}>
                Run agents <ArrowRight size={15} />
              </Button>
            </div>
          </section>
        </div>

        {/* Business impact — white card */}
        <aside>
          <div className="sticky top-6 rounded-card border border-ink-900/8 bg-white p-5 shadow-card">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-ink-400">Business impact</h2>
            <dl className="mt-4 flex flex-col gap-4">
              {[
                { label: 'Current delay', value: `${e.businessImpact.currentDelayHours}h` },
                { label: 'Predicted delay', value: e.businessImpact.predictedDelayRange },
                { label: 'Shipment value', value: e.businessImpact.shipmentValue },
                { label: 'SLA status', value: e.businessImpact.slaStatus, highlight: true },
                { label: 'Estimated operational cost', value: e.businessImpact.estimatedCost },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-ink-400">{row.label}</dt>
                  <dd
                    className={`data mt-0.5 text-[15px] font-semibold ${
                      row.highlight ? 'text-[#B03030]' : 'text-ink-900'
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {e.workingCapital && (
              <div className="mt-5">
                <WorkingCapitalCard wc={e.workingCapital} />
              </div>
            )}

            {e.workingCapital && e.clientSegment === 'msme_d2c' && (
              <p className="mt-3 border-l-2 border-brand-purple/30 pl-3 text-[11px] italic leading-relaxed text-ink-600">
                “What holds MSMEs back is rarely the product — it's the supply chain behind it.” Every cleared
                exception releases working capital back to the client.
                <span className="mt-0.5 block not-italic text-[10px] text-ink-400">
                  — Dibyanshu Tripathi, CEO (YourStory feature)
                </span>
              </p>
            )}

            <div className="mt-5 border-t border-ink-900/8 pt-4">
              <Button variant="secondary" className="w-full" onClick={onOpenAgents}>
                View agent orchestration
              </Button>
              <p className="mt-2.5 text-center text-[10.5px] leading-relaxed text-ink-400">
                How the six agents produced this analysis →
              </p>
            </div>
          </div>
        </aside>
      </div>
      <AuthorFooter />
    </div>
  )
}
