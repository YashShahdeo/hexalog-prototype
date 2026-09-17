import { useEffect, useRef, useState } from 'react'
import { Check, FlaskConical, Play, X } from 'lucide-react'
import { EVALUATION_METRICS, SIMULATION_SCENARIOS, EVALUATION_NOTE } from '../data/evaluation'
import { SimulatedDataBanner } from '../components/SimulatedDataNote'
import { Button } from '../components/Button'
import { StepTracker } from '../components/StepTracker'
import { AuthorFooter } from '../components/AuthorFooter'
import { ArrowRight } from 'lucide-react'

type SuiteRowState = 'pending' | 'done'

type SuiteRun = {
  rows: { scenarioId: string; state: SuiteRowState }[]
  complete: boolean
}

export function EvaluationSimulator({ onOpenRoadmap }: { onOpenRoadmap: () => void }) {
  const [selectedId, setSelectedId] = useState<string>(SIMULATION_SCENARIOS[0].id)
  const [ranScenarioId, setRanScenarioId] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [suite, setSuite] = useState<SuiteRun | null>(null)
  const [suiteRunning, setSuiteRunning] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const runSimulation = () => {
    setRunning(true)
    setRanScenarioId(null)
    // Brief "running" beat so the action feels real, then render the pre-scripted result
    setTimeout(() => {
      setRunning(false)
      setRanScenarioId(selectedId)
    }, 700)
  }

  // FEATURE — full suite: cascade rows 700ms apart, total < 6s. Most recent run wins.
  const runSuite = () => {
    timers.current.forEach(clearTimeout)
    setSuiteRunning(true)
    setRanScenarioId(null)
    const rows = SIMULATION_SCENARIOS.map((s) => ({ scenarioId: s.id, state: 'pending' as const }))
    setSuite({ rows, complete: false })
    SIMULATION_SCENARIOS.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setSuite((prev) => {
            if (!prev) return prev
            const next = prev.rows.map((r, j) => (j <= i ? { ...r, state: 'done' as const } : r))
            return { rows: next, complete: i === SIMULATION_SCENARIOS.length - 1 }
          })
          if (i === SIMULATION_SCENARIOS.length - 1) setSuiteRunning(false)
        }, 500 + i * 700),
      )
    })
  }

  const result = ranScenarioId ? SIMULATION_SCENARIOS.find((s) => s.id === ranScenarioId)! : null
  const suiteRows = suite
    ? suite.rows
        .map((r) => ({ ...r, scenario: SIMULATION_SCENARIOS.find((s) => s.id === r.scenarioId)! }))
        .filter((r) => r.state === 'done')
    : []
  const suiteCounts = suite
    ? {
        resolved: suiteRows.filter((r) => r.scenario.outcome === 'pass').length,
        escalated: suiteRows.filter((r) => r.scenario.outcome === 'escalation').length,
        failed: suiteRows.filter((r) => r.scenario.outcome === 'failure').length,
        critical: suiteRows.reduce((acc, r) => acc + (r.scenario.criticalFailures ?? 0), 0),
      }
    : null

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

          <div className="flex flex-col gap-2 border-t border-ink-900/8 p-4">
            {/* Primary action — the suite is the demo moment */}
            <button
              onClick={runSuite}
              disabled={suiteRunning}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-purple px-4 py-3 text-[14px] font-bold text-white transition-colors hover:bg-brand-deep disabled:opacity-60"
            >
              <Play size={15} />{' '}
              {suiteRunning
                ? `Running suite… ${suiteRows.length}/${SIMULATION_SCENARIOS.length}`
                : `Run full eval suite — ${SIMULATION_SCENARIOS.length} scenarios`}
            </button>
            <button
              onClick={runSimulation}
              disabled={running}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-purple/30 bg-white px-4 py-2 text-[12.5px] font-semibold text-brand-purple transition-colors hover:bg-soft-lavender disabled:opacity-60"
            >
              {running ? 'Running…' : 'Run selected scenario only'}
            </button>
          </div>
        </section>
      </div>

      {/* Suite results — cascade; most recent run wins over the single view */}
      {suite && (
        <section className="mt-6 animate-fadeSlideIn overflow-hidden rounded-card border border-ink-900/8 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-soft-lavender/60 px-5 py-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink-900">Eval suite run</h2>
            <span className="data text-[11px] font-semibold text-brand-purple">
              {suiteRunning
                ? `running… ${suiteRows.length}/${SIMULATION_SCENARIOS.length}`
                : `${SIMULATION_SCENARIOS.length} scenarios · ${suiteCounts!.resolved} resolved autonomously · ${suiteCounts!.escalated} escalated within policy · ${suiteCounts!.failed} failed (caught at verification) · ${suiteCounts!.critical} critical failures`}
            </span>
          </div>

          {/* Mobile: stacked cards (§4.4 — never scroll a table on a phone) */}
          <div className="flex flex-col gap-3 bg-white p-4 md:hidden">
            {SIMULATION_SCENARIOS.map((s) => {
              const row = suite.rows.find((r) => r.scenarioId === s.id)
              if (!row || row.state === 'pending') {
                return (
                  <div key={s.id} className="rounded-lg border border-ink-900/8 px-3.5 py-2.5 opacity-40">
                    <p className="text-[12.5px] font-medium text-ink-400">{s.name}</p>
                    <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">queued…</p>
                  </div>
                )
              }
              const isFailure = s.outcome === 'failure'
              const isEscalation = s.outcome === 'escalation'
              return (
                <div
                  key={s.id}
                  className={`animate-fadeSlideIn rounded-lg border px-3.5 py-2.5 ${
                    isFailure
                      ? 'border-[#E5B8B8] bg-[#FDECEC]/40'
                      : isEscalation
                        ? 'border-[#F0E1A0] bg-[#FDF6DC]/40'
                        : 'border-ink-900/8'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-[12.5px] font-semibold leading-snug ${isFailure ? 'text-[#8A2424]' : 'text-ink-900'}`}>
                      {s.name}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        isFailure
                          ? 'bg-[#B03030] text-white'
                          : isEscalation
                            ? 'bg-[#8A6D0A] text-white'
                            : 'bg-success text-white'
                      }`}
                    >
                      {isFailure ? 'Failed · caught' : isEscalation ? 'Escalated' : 'Resolved'}
                    </span>
                  </div>
                  <p className="data mt-1.5 text-[11px] text-ink-600">
                    confidence {s.agentConfidence}% · task success {s.taskSuccessPct}%
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-ink-600" title={s.escalationPath}>
                    {s.escalationPath}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Desktop: table */}
          <div className="hidden overflow-x-auto bg-white md:block">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-ink-900/6 text-[10px] uppercase tracking-wider text-ink-400">
                  <th className="px-5 py-2.5 font-bold">Scenario</th>
                  <th className="px-3 py-2.5 font-bold">Outcome</th>
                  <th className="px-3 py-2.5 font-bold">Confidence</th>
                  <th className="px-3 py-2.5 font-bold">Task success</th>
                  <th className="px-5 py-2.5 font-bold">What we'd do about it</th>
                </tr>
              </thead>
              <tbody>
                {SIMULATION_SCENARIOS.map((s) => {
                  const row = suite.rows.find((r) => r.scenarioId === s.id)
                  if (!row || row.state === 'pending') {
                    return (
                      <tr key={s.id} className="border-b border-ink-900/6 opacity-40">
                        <td className="px-5 py-3 text-[13px] font-medium text-ink-400">{s.name}</td>
                        <td className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                          queued…
                        </td>
                        <td className="px-3 py-3 text-[12px] text-ink-400">—</td>
                        <td className="px-3 py-3 text-[12px] text-ink-400">—</td>
                        <td className="px-5 py-3 text-[11.5px] text-ink-400">—</td>
                      </tr>
                    )
                  }
                  const isFailure = s.outcome === 'failure'
                  const isEscalation = s.outcome === 'escalation'
                  return (
                    <tr
                      key={s.id}
                      className={`animate-fadeSlideIn border-b border-ink-900/6 ${
                        isFailure ? 'bg-[#FDECEC]/40' : isEscalation ? 'bg-[#FDF6DC]/40' : 'bg-white'
                      }`}
                    >
                      <td
                        className={`px-5 py-3 text-[13px] font-medium ${isFailure ? 'text-[#8A2424]' : 'text-ink-900'}`}
                      >
                        {s.name}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            isFailure
                              ? 'bg-[#B03030] text-white'
                              : isEscalation
                                ? 'bg-[#8A6D0A] text-white'
                                : 'bg-success text-white'
                          }`}
                        >
                          {isFailure
                            ? 'Failed · caught'
                            : isEscalation
                              ? 'Escalated'
                              : 'Resolved'}
                        </span>
                      </td>
                      <td className="data px-3 py-3 text-[12px] text-ink-900">{s.agentConfidence}%</td>
                      <td
                        className={`data px-3 py-3 text-[12px] font-semibold ${
                          (s.taskSuccessPct ?? 0) < 50 ? 'text-[#B03030]' : 'text-ink-900'
                        }`}
                      >
                        {s.taskSuccessPct}%
                      </td>
                      <td className="max-w-[260px] px-5 py-3">
                        <p
                          className="truncate text-[11.5px] leading-snug text-ink-600"
                          title={s.escalationPath}
                        >
                          {s.escalationPath}
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Honesty caption — required: the suite is the method, the DoD table is the 214-case sample */}
          {!suiteRunning && (
            <p className="border-t border-ink-900/8 bg-[#FCFBFE] px-5 py-3 text-[11.5px] leading-relaxed text-ink-600">
              These {SIMULATION_SCENARIOS.length} scenarios are the illustrative edge cases. The Definition of Done
              table above reports the full 214-case synthetic eval run — the suite demonstrates the method, not the
              sample size.
            </p>
          )}
        </section>
      )}

      {/* Latest simulation run (single) */}
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
      <div className="mt-6 flex flex-col items-end gap-1.5">
        {suite?.complete && (
          <p className="text-[11.5px] leading-relaxed text-ink-600">
            Every verified outcome — including the failure — becomes eval data. That loop is what the roadmap's
            phase gates are measured against.
          </p>
        )}
        <Button size="lg" onClick={onOpenRoadmap}>
          Continue to Roadmap &amp; ROI <ArrowRight size={15} />
        </Button>
      </div>

      <AuthorFooter />
    </div>
  )
}
