import {
  LayoutDashboard,
  AlertTriangle,
  Package,
  Bot,
  FileText,
  Handshake,
  BarChart3,
  FlaskConical,
  Settings,
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

interface NavItem {
  id: ViewId | null
  label: string
  icon: LucideIcon
}

const NAV: NavItem[] = [
  { id: 'tower', label: 'Control Tower', icon: LayoutDashboard },
  { id: 'ledger', label: 'Exceptions', icon: AlertTriangle },
  { id: null, label: 'Shipments', icon: Package },
  { id: 'agents', label: 'AI Agents', icon: Bot },
  { id: null, label: 'Documents', icon: FileText },
  { id: null, label: 'Partners', icon: Handshake },
  { id: null, label: 'Analytics', icon: BarChart3 },
  { id: 'eval', label: 'Simulations', icon: FlaskConical },
  { id: null, label: 'Settings', icon: Settings },
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
    active === 'detail' ? 'ledger' : active === 'approval' ? 'ledger' : active === 'roadmap' ? 'eval' : active

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-ink-900/8 bg-white px-3 py-5">
      <div className="px-2 pb-6">
        <LogoLockup />
      </div>

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map((item) => {
          const isActive = item.id !== null && item.id === effectiveActive
          if (item.id) {
            const Icon = item.icon
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
          }
          // Disabled item with tooltip (PRD §12 decision #1)
          const Icon = item.icon
          return (
            <span
              key={item.label}
              title="Not included in this prototype"
              className="group flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium text-ink-400/60"
            >
              <Icon size={16} strokeWidth={2} className="text-ink-400/40" />
              {item.label}
              <span className="pointer-events-none ml-auto hidden whitespace-nowrap rounded-md bg-navy px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block">
                Not in this prototype
              </span>
            </span>
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
