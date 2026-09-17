export function StatCard({
  label,
  value,
  sub,
  tone = 'default',
  tooltip,
}: {
  label: string
  value: string | number
  sub?: string
  tone?: 'default' | 'success' | 'warning' | 'danger'
  tooltip?: string
}) {
  const toneStyles = {
    default: 'text-ink-900',
    success: 'text-success',
    warning: 'text-[#8A6D0A]',
    danger: 'text-[#B03030]',
  }
  return (
    <div className="w-full rounded-card border border-ink-900/8 bg-white p-3 sm:p-4 shadow-card" title={tooltip}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-600">{label}</p>
      <p className={`mt-1.5 text-[28px] font-bold leading-none ${toneStyles[tone]}`}>
        <span className="data">{value}</span>
      </p>
      {sub && <p className="mt-1.5 text-[11.5px] text-ink-600">{sub}</p>}
    </div>
  )
}
