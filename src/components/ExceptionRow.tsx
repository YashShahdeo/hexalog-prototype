import { ArrowRight } from 'lucide-react'
import type { Exception } from '../types'
import { Badge, SlaRiskBadge } from './Badge'

const CATEGORY_LABEL: Record<Exception['category'], string> = {
  customs: 'Customs',
  freight: 'Freight',
  warehouse: 'Warehouse',
  last_mile: 'Last-mile',
  reverse_logistics: 'Reverse logistics',
}

const SEGMENT_SHORT: Record<Exception['clientSegment'], string> = {
  msme_d2c: 'MSME',
  enterprise: 'ENT',
}

export function CategoryLabel({ category }: { category: Exception['category'] }) {
  return <span className="text-[12.5px] text-ink-600">{CATEGORY_LABEL[category]}</span>
}

function SegmentChip({ segment }: { segment: Exception['clientSegment'] }) {
  const isMsme = segment === 'msme_d2c'
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
        isMsme ? 'bg-brand-purple/10 text-brand-purple' : 'border border-ink-900/10 bg-white text-ink-400'
      }`}
    >
      {SEGMENT_SHORT[segment]}
    </span>
  )
}

/** Compact row for Control Tower priority list */
export function PriorityExceptionCard({
  exception,
  onOpen,
}: {
  exception: Exception
  onOpen: (id: string) => void
}) {
  return (
    <button
      onClick={() => onOpen(exception.id)}
      className="group w-full rounded-card border border-ink-900/8 bg-white p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-purple/40 hover:shadow-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="data text-[12px] font-semibold text-brand-purple">{exception.id}</span>
            <span className="text-[12px] text-ink-400">·</span>
            <span className="truncate text-[12.5px] text-ink-600">{exception.route}</span>
          </div>
          <p className="mt-1 truncate text-[14.5px] font-semibold text-ink-900">{exception.title}</p>
          <div className="mt-1.5 flex items-center gap-3 text-[12px] text-ink-600">
            <SegmentChip segment={exception.clientSegment} />
            <span className="data">{exception.shipmentId}</span>
            <span>Delay: <span className="data font-medium">{exception.businessImpact.currentDelayHours}h</span></span>
            <span>Value: <span className="data font-medium">{exception.businessImpact.shipmentValue}</span></span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Badge kind="severity" value={exception.severity} size="xs" />
          <SlaRiskBadge risk={exception.slaRisk} />
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold border border-brand-purple/20 bg-brand-purple/10 text-brand-purple">
            Investigate <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </button>
  )
}

/** §2.7 - the thesis at a glance: can this class resolve autonomously at all? */
function AutonomyChip({ plan }: { plan: Exception['resolutionPlan'] }) {
  const levels = plan.map((s) => s.autonomy)
  const label = levels.every((l) => l === 'auto') ? 'Auto-eligible' : levels.includes('human') ? 'Human-gated' : 'Partial'
  const cls =
    label === 'Auto-eligible'
      ? 'bg-[#E6F5EC] text-success border-[#BFE5CD]'
      : label === 'Human-gated'
        ? 'bg-navy text-white border-navy'
        : 'bg-[#FDF6DC] text-[#8A6D0A] border-[#F0E1A0]'
  return (
    <span
      className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${cls}`}
    >
      {label}
    </span>
  )
}

/** Full table row for Exception Ledger */
export function LedgerRow({
  exception,
  onOpen,
}: {
  exception: Exception
  onOpen: (id: string) => void
}) {
  return (
    <button
      onClick={() => onOpen(exception.id)}
      className="group w-full border-b border-ink-900/6 px-5 py-3.5 text-left transition-colors last:border-b-0 hover:bg-soft-lavender/60"
    >
      {/* Desktop: table row - exception column ≥220px, STATUS fully visible (category lives on the mobile card) */}
      <span className="hidden w-full grid-cols-[80px_minmax(220px,1fr)_100px_72px_150px] items-center gap-3 lg:grid">
        <Badge kind="severity" value={exception.severity} size="xs" />
        <span className="block min-w-0">
          <span className="block truncate text-[14px] font-semibold text-ink-900" title={exception.title}>
            {exception.title}
          </span>
          <span className="block truncate text-[12px] text-ink-600">
            <span className="data">{exception.id}</span> · {exception.route}
          </span>
        </span>
        <AutonomyChip plan={exception.resolutionPlan} />
        <span className="data text-[13px] font-semibold text-ink-900">{exception.confidence}%</span>
        <span className="flex items-center justify-end gap-1.5">
          <SegmentChip segment={exception.clientSegment} />
          <Badge kind="status" value={exception.status} size="xs" />
        </span>
      </span>

      {/* Mobile/tablet: stacked card - visible below lg, where the desktop table hides */}
      <span className="flex w-full flex-col gap-2 lg:hidden">
        <span className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5">
            <Badge kind="severity" value={exception.severity} size="xs" />
            <Badge kind="status" value={exception.status} size="xs" />
          </span>
          <span className="data text-[13px] font-semibold text-ink-900">{exception.confidence}%</span>
        </span>
        <span className="text-[14px] font-semibold leading-snug text-ink-900">{exception.title}</span>
        <span className="text-[12px] text-ink-600">
          <span className="data">{exception.id}</span> · {exception.route}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <SegmentChip segment={exception.clientSegment} />
          <CategoryLabel category={exception.category} />
          <AutonomyChip plan={exception.resolutionPlan} />
        </span>
      </span>
    </button>
  )
}
