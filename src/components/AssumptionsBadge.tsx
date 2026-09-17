import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { ASSUMPTIONS } from '../data/hexalogStory'

/**
 * §3.1 — persistent Assumptions badge. Lives in the StepTracker header row on every
 * in-app screen (WhyWorkflow has no StepTracker; its footer pointer line covers it).
 * Click opens a popover with the three-column assumptions surface.
 */
export function AssumptionsBadge() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative ml-auto">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-brand-purple/30 bg-soft-lavender px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-brand-purple transition-colors hover:bg-soft-lavender2"
      >
        <HelpCircle size={12} /> Assumptions
      </button>

      {open && (
        <>
          {/* Click-away catcher */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-50 w-[min(92vw,640px)] animate-fadeSlideIn rounded-card border border-ink-900/10 bg-white p-5 shadow-elevated">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[12px] font-bold uppercase tracking-widest text-brand-purple">
                Assumptions &amp; what I don't know
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] font-semibold text-ink-400 hover:text-ink-900"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#8A6D0A]">
                  Assumed — to validate in Week 1
                </p>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {ASSUMPTIONS.assumed.map((a) => (
                    <li key={a} className="text-[11px] leading-snug text-ink-600">
                      · {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-success">
                  Known — from public sources
                </p>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {ASSUMPTIONS.known.map((k) => (
                    <li key={k} className="text-[11px] leading-snug text-ink-600">
                      · {k}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-ink-400">
                  Simulated for this prototype
                </p>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {ASSUMPTIONS.simulated.map((s) => (
                    <li key={s} className="text-[11px] leading-snug text-ink-600">
                      · {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-3 border-t border-ink-900/6 pt-2 text-[10.5px] italic text-ink-400">
              Stated so it can be checked, not assumed away.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
