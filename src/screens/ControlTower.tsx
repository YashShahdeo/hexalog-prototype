import { StepTracker } from '../components/StepTracker'
import { EXCEPTIONS } from '../data/exceptions'
import { PriorityExceptionCard } from '../components/ExceptionRow'
import { StatCard } from '../components/StatCard'
import { SimulatedDataNote } from '../components/SimulatedDataNote'
import { AuthorFooter } from '../components/AuthorFooter'

export function ControlTower({ onOpenException }: { onOpenException: (id: string) => void }) {
  const open = EXCEPTIONS.filter((e) => e.status !== 'resolved')
  const atRisk = open.filter((e) => e.slaRisk !== 'low').length
  const bySeverity = {
    high: open.filter((e) => e.severity === 'high').length,
    medium: open.filter((e) => e.severity === 'medium').length,
    low: open.filter((e) => e.severity === 'low').length,
  }

  const priority = [...open]
    .sort((a, b) => {
      const rank = { high: 0, medium: 1, low: 2 }
      return rank[a.slaRisk] - rank[b.slaRisk] || a.confidence - b.confidence
    })
    .slice(0, 4)

  return (
    <div className="pt-6 pb-6 sm:px-6 lg:px-8">
      <StepTracker current="tower" />
      <header className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink-900">Control Tower</h1>
        <p className="mt-1 text-[13.5px] text-ink-600">
          Network health at a glance — what needs your attention right now.
        </p>
      </header>

      {/* Top stat row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Shipments in transit" value={312} sub="6 of 80+ lanes · filtered view" />
        <StatCard label="On track" value="284" sub="91.0% of network" tone="success" />
        <StatCard label="At risk" value={atRisk} sub="SLA exposure flagged" tone="warning" />
        <StatCard label="Open exceptions" value={open.length} sub="queued for resolution" tone="danger" />
      </div>

      {/* Severity breakdown */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <StatCard label="High severity" value={bySeverity.high} sub="customs-critical" tone="danger" />
        <StatCard label="Medium severity" value={bySeverity.medium} sub="needs review" tone="warning" />
        <StatCard label="Low severity" value={bySeverity.low} sub="auto-resolution likely" />
      </div>

      {/* Priority exceptions */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-ink-900">Priority Exceptions</h2>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Ranked by SLA risk
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {priority.map((e) => (
            <PriorityExceptionCard key={e.id} exception={e} onOpen={onOpenException} />
          ))}
        </div>
      </section>

      <div className="mt-8">
        <SimulatedDataNote />
        <AuthorFooter />
      </div>
    </div>
  )
}
