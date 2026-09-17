import { Check } from 'lucide-react'
import type { ViewId } from './Sidebar'

/** Guided walkthrough steps in narrative order (PRD §11). */
const STEPS: { key: ViewId; label: string }[] = [
  { key: 'tower', label: 'Control Tower' },
  { key: 'detail', label: 'Exception' },
  { key: 'agents', label: 'AI Agents' },
  { key: 'approval', label: 'Approve' },
  { key: 'eval', label: 'Evaluate' },
  { key: 'roadmap', label: 'Roadmap' },
]

const ORDER: ViewId[] = STEPS.map((s) => s.key)

export function StepTracker({ current }: { current: ViewId }) {
  // Screens without their own step map to the step they belong to.
  const mapped: ViewId = current === 'ledger' ? 'tower' : current
  const currentIdx = ORDER.indexOf(mapped)

  return (
    <div className="mb-6 flex items-center gap-1 rounded-card border border-ink-900/8 bg-white px-4 py-2.5 shadow-card">
      {STEPS.map((step, i) => {
        const done = i < currentIdx
        const active = i === currentIdx
        return (
          <span key={step.key} className="flex items-center gap-1">
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                active
                  ? 'bg-brand-purple text-white'
                  : done
                    ? 'text-success'
                    : 'text-ink-400'
              }`}
            >
              {done ? (
                <Check size={11} strokeWidth={3} />
              ) : (
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold ${
                    active ? 'bg-white/25 text-white' : 'bg-ink-900/8 text-ink-400'
                  }`}
                >
                  {i + 1}
                </span>
              )}
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className={`h-px w-4 ${done ? 'bg-success/50' : 'bg-ink-900/10'}`} />
            )}
          </span>
        )
      })}
      <span className="ml-auto hidden text-[10.5px] font-medium uppercase tracking-wider text-ink-400 sm:block">
        Guided walkthrough
      </span>
    </div>
  )
}
