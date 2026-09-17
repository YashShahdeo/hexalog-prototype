import type { EvaluationMetric, SimulationScenario } from '../types'

/** ILLUSTRATIVE / SIMULATED — Definition-of-Done metrics for the concept eval set. */
export const EVALUATION_METRICS: EvaluationMetric[] = [
  { name: 'Root-cause accuracy', target: '≥ 90%', simulatedCurrent: '93.4%', status: 'pass' },
  { name: 'Task success rate (approved plans)', target: '≥ 95%', simulatedCurrent: '96.1%', status: 'pass' },
  { name: 'Critical failures (regulatory/financial)', target: '0 tolerated', simulatedCurrent: '0', status: 'pass' },
  { name: 'Evidence trail completeness', target: '100%', simulatedCurrent: '100%', status: 'pass' },
  { name: 'Human override rate', target: '≤ 10%', simulatedCurrent: '11.3%', status: 'fail' },
  { name: 'False-confidence rate (confident AND wrong)', target: '≤ 2%', simulatedCurrent: '1.8%', status: 'pass' },
  { name: 'Median time-to-resolution (auto steps)', target: '≤ 4h', simulatedCurrent: '3.2h', status: 'pass' },
  { name: 'Verification pass rate (post-execution checks)', target: '≥ 95%', simulatedCurrent: '97.0%', status: 'pass' },
]

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'missing-doc',
    name: 'Missing commercial invoice',
    description: 'DOC_HOLD at customs; exporter unresponsive for 24h',
    passed: true,
    outcome: 'pass',
    escalationPath:
      'Pass → next autonomy step: with the override rate trending under target, this class is the candidate for end-to-end autonomous resolution at Phase 4.',
    agentConfidence: 84,
    taskSuccessPct: 96,
    criticalFailures: 0,
  },
  {
    id: 'hs-mismatch',
    name: 'HS code mismatch (ambiguous BOM)',
    description: 'Ambiguous BOM, two defensible readings — filing itself was fully consistent',
    passed: false,
    outcome: 'escalation',
    reason:
      'Escalation by design — regulatory ambiguity exceeds the autonomous-action threshold; dossier compiled for the compliance specialist',
    escalationPath:
      'Human path: the specialist decides with the compiled dossier (BOM, supplier spec, prior rulings). Assistive, never decisive — this class scores lowest on the taxonomy and is excluded from autonomous resolution.',
    agentConfidence: 71,
    taskSuccessPct: 88,
    criticalFailures: 0,
  },
  {
    id: 'carrier-delay',
    name: 'Carrier delay (port congestion)',
    description: 'Berthing slip +26h; feeder alternative available',
    passed: true,
    outcome: 'pass',
    escalationPath:
      'Pass → next autonomy step: client-approval requirement stays for the incremental-cost decision; detection-to-option time is the metric to shrink next.',
    agentConfidence: 91,
    taskSuccessPct: 97,
    criticalFailures: 0,
  },
  {
    id: 'conflicting-eta',
    name: 'Conflicting ETA sources',
    description: 'Carrier API and client portal report ETAs 14h apart',
    passed: true,
    outcome: 'pass',
    escalationPath:
      'Pass → next autonomy step: source-precedence rules become codified policy once the eval set shows ≥95% agreement with ops judgment.',
    agentConfidence: 87,
    taskSuccessPct: 94,
    criticalFailures: 0,
  },
  {
    id: 'high-value',
    name: 'High-value shipment (₹25L+)',
    description: 'Financial-impact threshold crossed on duty correction',
    passed: false,
    outcome: 'escalation',
    reason:
      'Escalation required — shipment value above autonomous financial-action ceiling; approval mandatory',
    escalationPath:
      'Human path: financial controller approves any action above the ceiling. The threshold itself is tunable — it widens only when false-confidence rate stays ≤2% across the class for a full quarter.',
    agentConfidence: 76,
    taskSuccessPct: 90,
    criticalFailures: 0,
  },
  {
    id: 'mis-attributed-root-cause',
    name: 'Mis-attributed root cause',
    description: 'Carrier delay masked an upstream documentation gap',
    passed: false,
    outcome: 'failure',
    reason:
      'FAILED — CAUGHT AT VERIFICATION. Investigation Agent attributed the delay to port congestion at 91% confidence. Post-execution verification found the shipment was under DOC_HOLD the whole time — the congestion was real but was not the binding constraint. Exception reopened, case added to the eval set, confidence threshold for single-source carrier attribution raised.',
    escalationPath:
      'Verification catches it, not the human — this is why post-execution checks are a hard gate and not a formality. The case becomes eval data; the pattern (single-source attribution when a second system disagrees) becomes a detection rule.',
    agentConfidence: 91,
    taskSuccessPct: 0,
    criticalFailures: 0,
  },
]

export const EVALUATION_NOTE =
  'All figures on this screen are prototype/simulated data from a synthetic eval set of 214 cases. They demonstrate the measurement approach, not production performance.'
