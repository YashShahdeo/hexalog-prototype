import { ArrowLeft, Bot } from 'lucide-react'
import { AGENTS, ORCHESTRATION_PRINCIPLE } from '../data/agents'
import { AgentCard } from '../components/AgentCard'

export function AgentOrchestration({
  exceptionId,
  onBack,
}: {
  exceptionId: string
  onBack: () => void
}) {
  const active = AGENTS.length

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-600 transition-colors hover:text-brand-purple"
      >
        <ArrowLeft size={14} /> Back to exception
      </button>

      {/* Context strip */}
      <div className="mb-6 flex items-center justify-between rounded-card border border-brand-purple/15 bg-soft-lavender px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <Bot size={17} className="text-brand-purple" />
          <p className="text-[13px] text-ink-900">
            Orchestration view scoped to exception{' '}
            <span className="data font-semibold text-brand-purple">{exceptionId}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-ink-600">
          <span>
            Agents <span className="data font-semibold text-ink-900">{AGENTS.length}</span>
          </span>
          <span>
            Active <span className="data font-semibold text-success">{active}</span>
          </span>
        </div>
      </div>

      <header className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink-900">Agent Orchestration</h1>
        <p className="mt-1 text-[13.5px] text-ink-600">
          How the system works — six narrow agents with explicit boundaries, not one undifferentiated AI.
        </p>
      </header>

      {/* 2 × 3 grid */}
      <div className="grid grid-cols-2 gap-4">
        {AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Principle banner */}
      <div className="mt-7 rounded-card bg-navy px-6 py-5 shadow-elevated">
        <p className="text-center text-[14px] font-semibold text-white">
          {ORCHESTRATION_PRINCIPLE}
        </p>
        <p className="mt-1.5 text-center text-[11.5px] text-white/50">
          Every agent has a defined input, goal, toolset and output — and its autonomy is set by policy, not by the model.
        </p>
      </div>
    </div>
  )
}
