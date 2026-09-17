import {
  LayoutDashboard,
  AlertTriangle,
  Bot,
  FlaskConical,
  Flag,
  ListFilter,
  type LucideIcon,
} from 'lucide-react'
import { LogoLockup } from './HexMark'

export type ViewId =
  | 'tower'
  | 'ledger'
  | 'detail'
  | 'agents'
  | 'approval'
  | 'eval'
  | 'roadmap'
  | 'taxonomy'

interface NavItem {
  id: ViewId | null
  label: string
  icon: LucideIcon
}

/** Only modules built in this prototype scope — every item is clickable. */
const NAV: NavItem[] = [
  { id: 'tower', label: 'Control Tower', icon: LayoutDashboard },
  { id: 'ledger', label: 'Exceptions', icon: AlertTriangle },
  { id: 'agents', label: 'AI Agents', icon: Bot },
  { id: 'eval', label: 'Simulations', icon: FlaskConical },
  { id: 'roadmap', label: 'Roadmap & ROI', icon: Flag },
  { id: 'taxonomy', label: 'Taxonomy', icon: ListFilter },
]

export function Sidebar({
  active,
  onNavigate,
}: {
  active: ViewId
  onNavigate: (v: ViewId) => void
}) {
  // Highlight the closest nav item for screens without their own entry.
  const effectiveActive: ViewId =
    active === 'detail' || active === 'approval'
      ? 'ledger'
      : active === 'taxonomy'
        ? 'eval'
        : active

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-ink-900/8 bg-white px-3 py-5">
      <div className="px-2 pb-6">
        <LogoLockup />
      </div>

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map((item) => {
          const isActive = item.id !== null && item.id === effectiveActive
          const Icon = item.icon!
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.id!)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-left text-[13.5px] font-medium transition-colors ${
                isActive
                  ? 'border-l-2 border-brand-purple bg-soft-lavender text-brand-purple'
                  : 'border-l-2 border-transparent text-ink-600 hover:bg-soft-lavender/60 hover:text-ink-900'
              }`}
            >
              <Icon size={16} strokeWidth={2} className={isActive ? 'text-brand-purple' : 'text-ink-400 group-hover:text-ink-600'} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mx-1 rounded-card border border-ink-900/6 bg-soft-lavender/70 p-3">
        <p className="text-[10.5px] leading-relaxed text-ink-600">
          <span className="font-semibold text-brand-purple">Concept prototype.</span> All shipment data and metrics are illustrative — no real Hexalog systems or data.
        </p>
      </div>
    </aside>
  )
}
