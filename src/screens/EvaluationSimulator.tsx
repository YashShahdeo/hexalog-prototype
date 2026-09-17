import { useState } from 'react'
import { Check, FlaskConical, Play, X } from 'lucide-react'
import { EVALUATION_METRICS, SIMULATION_SCENARIOS, EVALUATION_NOTE } from '../data/evaluation'
import { SimulatedDataBanner } from '../components/SimulatedDataNote'
import { Button } from '../components/Button'
import { StepTracker } from '../components/StepTracker'
import { AuthorFooter } from '../components/AuthorFooter'
import { ArrowRight } from 'lucide-react'

export function EvaluationSimulator({ onOpenRoadmap }: { onOpenRoadmap: () => void }) {
  const [selectedId, setSelectedId] = useState<string>(SIMULATION_SCENARIOS[0].id)
  const [ranScenarioId, setRanScenarioId] = useState<string | null>(null)
  const [running, setRunning] = useState(false)

  const runSimulation = () => {
    setRunning(true)
    setRanScenarioId(null)
    // Brief "running" beat so the action feels real, then render the pre-scripted result
    setTimeout(() => {
      setRunning(false)
      setRanScenarioId(selectedId)
    }, 700)
  }

  const result = ranScenarioId ? SIMULATION_SCENARIOS.find((s) => s.id === ranScenarioId)! : null

  return (
    <div className="pt-6 pb-6 sm:px-6 lg:px-8">
      <StepTracker current="eval" />
      <header className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink-900">Evaluation & Simulator</h1>
        <p className="mt-1 text-[13.5px] text-ink-600">
          A digital twin of the exception workflow — run the agents against real-world and edge-case scenarios
          before they touch a live shipment. Measured, not assumed.
        </p>
      </header>

      <div className="mb-6">
        <SimulatedDataBanner text={EVALUATION_NOTE} />
      </div>

      {/* Top two-panel section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Agent performance table */}
        <section className="overflow-hidden rounded-card border border-ink-900/8 bg-white shadow-card">
          <div className="border-b border-ink-900/8 bg-soft-lavender/60 px-5 py-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink-900">
              Agent performance — Definition of Done
            </h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-ink-900/6 text-[10px] uppercase tracking-wider text-ink-400">
                <th className="px-5 py-2.5 font-bold">Metric</th>
                <th className="px-3 py-2.5 font-bold">Target</th>
                <th className="px-3 py-2.5 font-bold">Simulated current</th>
                <th className="px-5 py-2.5 text-right font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {EVALUATION_METRICS.map((m) => (
                <tr key={m.name} className="border-b border-ink-900/6 last:border-b-0">
                  <td className="px-5 py-3 text-[13px] font-medium text-ink-900">{m.name}</td>
                  <td className="data px-3 py-3 text-[12px] text-ink-600">{m.target}</td>
                  <td className="data px-3 py-3 text-[12.5px] font-semibold text-ink-900">{m.simulatedCurrent}</td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        m.status === 'pass' ? 'bg-[#E6F5EC] text-success' : 'bg-[#FDECEC] text-[#B03030]'
                      }`}
                    >
                      {m.status === 'pass' ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-ink-900/6 bg-[#FDF6DC]/50 px-5 py-2.5 text-[11px] leading-relaxed text-[#8A6D0A]">
            Human override rate currently misses target (11.3% vs ≤10%) — under ambiguous cases like
            HXL001351, the autonomy threshold is deliberately conservative (escalation by design). Tuning it
            is a roadmap-phase task, not a demo fix.
          </p>
        </section>

        {/* Scenario simulator */}
        <section className="flex flex-col rounded-card border border-ink-900/8 bg-white shadow-card">
          <div className="border-b border-ink-900/8 bg-soft-lavender/60 px-5 py-3">
            <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-ink-900">
              <FlaskConical size={14} className="text-brand-purple" /> Scenario simulator
            </h2>
          </div>

          <div className="flex flex-1 flex-col gap-2 p-4">
            {SIMULATION_SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                  selectedId === s.id
                    ? 'border-brand-purple bg-soft-lavender'
                    : 'border-ink-900/8 hover:border-brand-purple/40'
                }`}
              >
                <p className={`text-[13px] font-semibold ${selectedId === s.id ? 'text-brand-purple' : 'text-ink-900'}`}>
                  {s.name}
                </p>
                <p className="mt-0.5 text-[11.5px] text-ink-600">{s.description}</p>
              </button>
            ))}
          </div>

          <div className="border-t border-ink-900/8 p-4">
            <button
              onClick={runSimulation}
              disabled={running}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-purple px-4 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-brand-deep disabled:opacity-60"
            >
              <Play size={14} /> {running ? 'Running…' : 'Run simulation'}
            </button>
          </div>
        </section>
      </div>

      {/* Latest simulation run */}
      {result && (
        <section
          className={`mt-6 animate-fadeSlideIn overflow-hidden rounded-card border shadow-card ${
            result.outcome === 'failure'
              ? 'border-[#E5B8B8]'
              : result.outcome === 'escalation'
                ? 'border-[#F0E1A0]'
                : 'border-[#BFE5CD]'
          }`}
        >
          <div
            className={`flex items-center justify-between px-5 py-3 ${
              result.outcome === 'failure'
                ? 'bg-[#FDECEC]'
                : result.outcome === 'escalation'
                  ? 'bg-[#FDF6DC]'
                  : 'bg-[#E6F5EC]'
            }`}
          >
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink-900">
              Latest simulation run — {result.name}
            </h2>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                result.outcome === 'failure'
                  ? 'bg-[#B03030] text-white'
                  : result.outcome === 'escalation'
                    ? 'bg-[#8A6D0A] text-white'
                    : 'bg-success text-white'
              }`}
            >
              {result.outcome === 'failure'
                ? 'Failed — caught at verification'
                : result.outcome === 'escalation'
                  ? 'Escalation required'
                  : 'Resolved autonomously (within policy)'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 bg-white px-5 py-4 sm:grid-cols-3">
            <div className="col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Result</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-900">
                {result.passed
                  ? `All agents operated within policy. Root cause identified at ${result.agentConfidence}% confidence; approved plan executed and verified with zero critical failures.`
                  : result.reason}
              </p>
            </div>
            <div className="flex flex-col gap-3 border-t border-ink-900/8 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Agent confidence</p>
                <p className="data text-[17px] font-bold text-ink-900">{result.agentConfidence}%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Task success</p>
                <p
                  className={`data text-[17px] font-bold ${
                    (result.taskSuccessPct ?? 0) < 50 ? 'text-[#B03030]' : 'text-ink-900'
                  }`}
                >
                  {result.taskSuccessPct}%
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">Critical failures</p>
                <p className="data text-[17px] font-bold text-success">
                  {result.criticalFailures} <span className="text-[11px] font-medium text-ink-600">(target: 0, always)</span>
                </p>
              </div>
            </div>
          </div>

          {result.escalationPath && (
            <div className="border-t border-ink-900/8 bg-[#FCFBFE] px-5 py-3.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-purple">What we'd do about it</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-600">{result.escalationPath}</p>
            </div>
          )}
        </section>
      )}

      {/* Walkthrough continuation (PRD §11: Eval -> Roadmap) */}
      <div className="mt-6 flex items-center justify-end">
        <Button size="lg" onClick={onOpenRoadmap}>
          Continue to Roadmap & ROI <ArrowRight size={15} />
        </Button>
      </div>

      <AuthorFooter />
    </div>
  )
}
