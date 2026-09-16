import { ArrowDownToLine, Target, Wrench, ArrowUpFromLine, Gauge, ShieldCheck } from 'lucide-react'
import type { Agent } from '../types'
import { Badge } from './Badge'

const FIELDS: { key: keyof Pick<Agent, 'input' | 'goal' | 'tools' | 'output'>; icon: typeof Target; label: string }[] = [
  { key: 'input', icon: ArrowDownToLine, label: 'Input' },
  { key: 'goal', icon: Target, label: 'Goal' },
  { key: 'tools', icon: Wrench, label: 'Tools' },
  { key: 'output', icon: ArrowUpFromLine, label: 'Output' },
]

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="flex flex-col rounded-card border border-ink-900/8 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-bold text-ink-900">{agent.name}</h3>
        <Badge kind="autonomy" value={agent.autonomy} size="xs" />
      </div>

      <dl className="mt-4 flex flex-col gap-3">
        {FIELDS.map(({ key, icon: Icon, label }) => (
          <div key={key} className="flex gap-2.5">
            <Icon size={14} className="mt-0.5 shrink-0 text-brand-violet" />
            <div className="min-w-0">
              <dt className="text-[10px] font-bold uppercase tracking-widest text-ink-400">{label}</dt>
              <dd className="text-[12.5px] leading-snug text-ink-900">{agent[key]}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center gap-4 border-t border-ink-900/6 pt-3.5">
        <span className="flex items-center gap-1.5 text-[12px] text-ink-600">
          <Gauge size={13} className="text-brand-violet" />
          Confidence <span className="data font-semibold text-ink-900">{agent.confidence}%</span>
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-ink-600">
          <ShieldCheck size={13} className="text-brand-violet" />
          Policy-bound
        </span>
      </div>
    </div>
  )
}
