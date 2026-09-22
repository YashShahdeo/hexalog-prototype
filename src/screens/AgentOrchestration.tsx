import { ArrowLeft, ArrowRight, Bot } from 'lucide-react'
import { AGENTS, ORCHESTRATION_PRINCIPLE } from '../data/agents'
import { PLATFORM_BRIDGE } from '../data/hexalogStory'
import { AgentCard } from '../components/AgentCard'
import { StepTracker } from '../components/StepTracker'
import { Button } from '../components/Button'
import { AuthorFooter } from '../components/AuthorFooter'

export function AgentOrchestration({
  exceptionId,
  onBack,
  onOpenApproval,
}: {
  exceptionId: string
  onBack: () => void
  onOpenApproval: () => void
}) {
  const active = AGENTS.length

  return (
    <div className="pt-6 pb-6 sm:px-6 lg:px-8">
      <StepTracker current="agents" />
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
          How the system works - six narrow agents on Hexalog's orchestration platform, with explicit
          boundaries, not one undifferentiated AI.
        </p>
      </header>

      {/* Two-layer mapping - the CPTO's own public architecture vocabulary */}
      <p className="mb-3 text-[12.5px] leading-relaxed text-ink-900">
        Mapped to Hexalog's stated architecture: Detection and Investigation sit in the{' '}
        <span className="font-semibold text-brand-purple">semantic layer</span> (making operational state
        legible); Resolution and Execution sit in the{' '}
        <span className="font-semibold text-brand-purple">orchestration layer</span> (acting on it behind a
        simple interface).
      </p>

      {/* Platform framing - stated as assumption, not internal knowledge */}
      <p className="mb-4 text-[12px] leading-relaxed text-ink-600">
        Assumed architecture - to validate in Week 1: agents consume the orchestration platform's event
        streams, document store and partner network as a resolution layer on top of the existing platform, not
        a parallel system. The specific stream and document-store shape below is an assumption drawn from
        public product descriptions, not internal knowledge.
      </p>

      {/* 2 × 3 grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Principle banner - white card with purple accent */}
      <div className="mt-7 rounded-card border border-ink-900/8 border-l-4 border-l-brand-purple bg-white px-6 py-5 shadow-card">
        <p className="text-center text-[14px] font-semibold text-ink-900">
          {ORCHESTRATION_PRINCIPLE}
        </p>
        <p className="mt-1.5 text-center text-[11.5px] text-ink-600">
          Every agent has a defined input, goal, toolset and output - and its autonomy is set by policy, not by the model.{' '}
          {PLATFORM_BRIDGE}
        </p>
      </div>

      {/* Guided next step */}
      <div className="mt-6 flex items-center justify-end">
        <Button size="lg" onClick={onOpenApproval}>
          Continue to approval <ArrowRight size={15} />
        </Button>
      </div>
      <AuthorFooter />
    </div>
  )
}
