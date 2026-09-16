import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, ClipboardCheck, RefreshCw, ShieldCheck, UserCheck } from 'lucide-react'
import { EXCEPTIONS } from '../data/exceptions'

type Phase = 'awaiting' | 'executing' | 'verifying' | 'verified'

const EXECUTION_ITEMS = [
  { label: 'Invoice request sent to exporter (Document Agent)', detail: 'auto step · completed 2m after approval' },
  { label: 'Invoice received & validated against packing list', detail: 'auto step · 14 line items, values matched' },
  { label: 'Customs resubmission package prepared', detail: 'recommend step · drafted for review' },
  { label: 'Resubmission approved & submitted (Compliance Specialist)', detail: 'human step · approved by V. Malik' },
  { label: 'DOC_HOLD release confirmed, client ETA updated', detail: 'auto step · customs feed shows CLEARED' },
]

const LOOP_STEPS = ['Approve', 'Execute', 'Verify', 'Learn / evaluate']

export function ApprovalFlow({
  exceptionId,
  onBack,
  onOpenEval,
}: {
  exceptionId: string
  onBack: () => void
  onOpenEval: () => void
}) {
  const exception = EXCEPTIONS.find((e) => e.id === exceptionId) ?? EXCEPTIONS[0]
  const [phase, setPhase] = useState<Phase>('awaiting')
  const [completed, setCompleted] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const startExecution = () => {
    if (phase !== 'awaiting') return
    setPhase('executing')
    // Staggered checklist reveal, 200ms apart (PRD: 150–250ms)
    EXECUTION_ITEMS.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setCompleted(i + 1)
          if (i === EXECUTION_ITEMS.length - 1) {
            setPhase('verifying')
            timers.current.push(setTimeout(() => setPhase('verified'), 900))
          }
        }, 250 + i * 200),
      )
    })
  }

  const humanSteps = exception.resolutionPlan.filter((s) => s.autonomy === 'human')
  const recommendSteps = exception.resolutionPlan.filter((s) => s.autonomy === 'recommend')
  const autoSteps = exception.resolutionPlan.filter((s) => s.autonomy === 'auto')

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-600 transition-colors hover:text-brand-purple"
      >
        <ArrowLeft size={14} /> Back to exception
      </button>

      <header className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink-900">Approval → Execution → Verification</h1>
        <p className="mt-1 text-[13.5px] text-ink-600">
          Closing the loop for <span className="data font-semibold text-brand-purple">{exception.id}</span> ·{' '}
          {exception.title}
        </p>
      </header>

      <div className="grid grid-cols-3 gap-5">
        {/* Column 1 — Human approval */}
        <section className="rounded-card border border-ink-900/8 bg-white p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-ink-900">
            <UserCheck size={15} className="text-brand-purple" /> Human approval
          </h2>

          <div className="mt-4 flex flex-col gap-2.5">
            {autoSteps.map((s) => (
              <div key={s.step} className="rounded-lg border border-ink-900/8 bg-soft-lavender/50 px-3.5 py-2.5">
                <p className="text-[12.5px] font-medium leading-snug text-ink-900">{s.action}</p>
                <p className="mt-1 text-[10.5px] text-ink-600">{s.owner}</p>
              </div>
            ))}
            {recommendSteps.map((s) => (
              <div key={s.step} className="rounded-lg border border-[#F0E1A0] bg-[#FDF6DC]/60 px-3.5 py-2.5">
                <p className="text-[12.5px] font-medium leading-snug text-ink-900">{s.action}</p>
                <p className="mt-1 text-[10.5px] text-ink-600">{s.owner}</p>
              </div>
            ))}
            {humanSteps.map((s) => (
              <div key={s.step} className="rounded-lg border-2 border-[#E5B8B8] bg-[#FDECEC] px-3.5 py-2.5">
                <p className="text-[12.5px] font-semibold leading-snug text-[#8A2424]">{s.action}</p>
                <p className="mt-1 text-[10.5px] font-medium text-[#B03030]">
                  {s.owner} · requires sign-off
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={startExecution}
            disabled={phase !== 'awaiting'}
            className={`mt-5 w-full rounded-lg px-4 py-3 text-[13.5px] font-bold transition-all ${
              phase === 'awaiting'
                ? 'bg-brand-purple text-white hover:bg-brand-deep'
                : 'cursor-default bg-soft-lavender text-ink-400'
            }`}
          >
            {phase === 'awaiting' ? 'Approve & execute' : 'Approved ✓'}
          </button>
          <p className="mt-2.5 text-center text-[10.5px] leading-relaxed text-ink-600">
            {humanSteps.length} regulatory step{humanSteps.length === 1 ? '' : 's'} stay human-gated under the
            autonomy policy.
          </p>
        </section>

        {/* Column 2 — Execution checklist */}
        <section
          className={`rounded-card border border-ink-900/8 bg-white p-5 shadow-card transition-opacity ${
            phase === 'awaiting' ? 'opacity-45' : 'opacity-100'
          }`}
        >
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-ink-900">
            <ClipboardCheck size={15} className="text-brand-purple" /> Execution
          </h2>

          <div className="mt-4 flex flex-col gap-2.5">
            {EXECUTION_ITEMS.map((item, i) => {
              const done = i < completed
              return (
                <div
                  key={item.label}
                  className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 transition-all ${
                    done ? 'animate-fadeSlideIn border-[#BFE5CD] bg-[#E6F5EC]' : 'border-ink-900/8 bg-white'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 animate-checkPop text-success" />
                  ) : (
                    <Circle size={16} className="mt-0.5 shrink-0 text-ink-400" />
                  )}
                  <div>
                    <p className={`text-[12.5px] font-medium leading-snug ${done ? 'text-ink-900' : 'text-ink-400'}`}>
                      {item.label}
                    </p>
                    {done && <p className="mt-0.5 text-[10.5px] text-ink-600">{item.detail}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Column 3 — Verify outcome (dark panel) */}
        <section className="rounded-card bg-navy p-5 shadow-elevated">
          <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-white">
            <ShieldCheck size={15} className="text-soft-yellow" /> Verify outcome
          </h2>

          <dl className="mt-4 flex flex-col gap-3">
            {[
              { label: 'Customs status', pending: 'checking…', final: 'DOC_HOLD cleared', ok: true },
              { label: 'Carrier status', pending: 'checking…', final: 'Terminal gate-out confirmed', ok: true },
              { label: 'ETA', pending: 'checking…', final: 'Restored — 18 Sep, 14:00 IST', ok: true },
              { label: 'Customer notified', pending: 'checking…', final: 'Yes — revised ETA sent', ok: true },
              { label: 'SLA status', pending: 'checking…', final: 'Recovered — on track', ok: true },
            ].map((row) => {
              const show = phase === 'verified'
              return (
                <div key={row.label} className="flex items-center justify-between gap-3 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-white/45">{row.label}</dt>
                  <dd className={`text-[12px] font-semibold ${show ? (row.ok ? 'text-[#9be29b]' : 'text-soft-red') : 'text-white/35'}`}>
                    {show ? row.final : row.pending}
                  </dd>
                </div>
              )
            })}
          </dl>

          <div className="mt-5">
            {phase === 'verified' ? (
              <div className="animate-fadeSlideIn flex items-center justify-center gap-2 rounded-lg bg-[#9be29b]/15 px-4 py-3">
                <CheckCircle2 size={17} className="text-[#9be29b]" />
                <span className="text-[13.5px] font-bold text-[#9be29b]">Resolution verified · 96%</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-white/5 px-4 py-3">
                <RefreshCw size={15} className={`text-white/40 ${phase === 'verifying' ? 'animate-spin' : ''}`} />
                <span className="text-[12.5px] font-medium text-white/40">
                  {phase === 'awaiting' ? 'Awaiting approval' : 'Running verification checks…'}
                </span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Outcome loop strip */}
      <div className="mt-7 rounded-card bg-navy px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          {LOOP_STEPS.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span
                className={`rounded-full px-4 py-1.5 text-[12px] font-semibold ${
                  phase === 'verified' && i < 3 ? 'bg-soft-yellow text-brand-darkest' : 'bg-white/8 text-white/70'
                }`}
              >
                {step}
              </span>
              {i < LOOP_STEPS.length - 1 && <ArrowRight size={13} className="text-white/30" />}
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-center text-[11px] text-white/45">
          Verified outcomes become new evaluation data — the loop feeds screen 06.
        </p>
        {phase === 'verified' && (
          <div className="mt-3 text-center">
            <button
              onClick={onOpenEval}
              className="text-[12px] font-semibold text-soft-yellow underline-offset-2 hover:underline"
            >
              Continue to Evaluation →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
