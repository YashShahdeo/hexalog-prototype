import type { AutonomyLevel, ExceptionStatus, Severity } from '../types'

type BadgeKind = 'severity' | 'autonomy' | 'status'

const SEVERITY_STYLES: Record<Severity, string> = {
  high: 'bg-[#FDECEC] text-[#B03030] border-[#F5C6C6]',
  medium: 'bg-[#FDF6DC] text-[#8A6D0A] border-[#F0E1A0]',
  low: 'bg-soft-lavender text-brand-purple border-[#DCD0F0]',
}

const AUTONOMY_STYLES: Record<AutonomyLevel, string> = {
  auto: 'bg-[#E6F5EC] text-success border-[#BFE5CD]',
  recommend: 'bg-[#FDF6DC] text-[#8A6D0A] border-[#F0E1A0]',
  human: 'bg-navy text-white border-navy',
}

const STATUS_STYLES: Record<ExceptionStatus, string> = {
  new: 'bg-[#EDE9F7] text-brand-purple border-[#DCD0F0]',
  in_review: 'bg-[#FDF6DC] text-[#8A6D0A] border-[#F0E1A0]',
  resolved: 'bg-[#E6F5EC] text-success border-[#BFE5CD]',
}

const LABELS: Record<string, string> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
  auto: 'AUTO',
  recommend: 'RECOMMEND',
  human: 'HUMAN',
  new: 'NEW',
  in_review: 'IN REVIEW',
  resolved: 'RESOLVED',
}

export function Badge({
  kind,
  value,
  size = 'sm',
}: {
  kind: BadgeKind
  value: Severity | AutonomyLevel | ExceptionStatus
  size?: 'sm' | 'xs'
}) {
  const style =
    kind === 'severity'
      ? SEVERITY_STYLES[value as Severity]
      : kind === 'autonomy'
        ? AUTONOMY_STYLES[value as AutonomyLevel]
        : STATUS_STYLES[value as ExceptionStatus]

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border font-semibold uppercase tracking-wide ${
        size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'
      } ${style}`}
    >
      {LABELS[value] ?? value}
    </span>
  )
}

export function SlaRiskBadge({ risk }: { risk: 'high' | 'medium' | 'low' }) {
  const style =
    risk === 'high'
      ? 'bg-[#B03030] text-white'
      : risk === 'medium'
        ? 'bg-[#8A6D0A] text-white'
        : 'bg-ink-600 text-white'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${style}`}>
      SLA · {LABELS[risk]}
    </span>
  )
}
