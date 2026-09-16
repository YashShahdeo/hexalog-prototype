import type { EvaluationMetric, SimulationScenario } from '../types'

/** ILLUSTRATIVE / SIMULATED — Definition-of-Do Done metrics for the concept eval set. */
export const EVALUATION_METRICS: EvaluationMetric[] = [
  { name: 'Root-cause accuracy', target: '≥ 90%', simulatedCurrent: '93.4%', status: 'pass' },
  { name: 'Task success rate (approved plans)', target: '≥ 95%', simulatedCurrent: '96.1%', status: 'pass' },
  { name: 'Critical failures (regulatory/financial)', target: '0 tolerated', simulatedCurrent: '0', status: 'pass' },
  { name: 'Evidence trail completeness', target: '100%', simulatedCurrent: '100%', status: 'pass' },
  { name: 'Human override rate', target: '≤ 10%', simulatedCurrent: '11.3%', status: 'fail' },
  { name: 'Median time-to-resolution (auto steps)', target: '≤ 4h', simulatedCurrent: '3.2h', status: 'pass' },
  { name: 'Verification pass rate (post-execution checks)', target: '≥ 95%', simulatedCurrent: '97.0%', status: 'pass' },
]

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'missing-doc',
    name: 'Missing commercial invoice',
    description: 'DOC_HOLD at customs; exporter unresponsive for 24h',
    passed: true,
    agentConfidence: 84,
    taskSuccessPct: 96,
    criticalFailures: 0,
  },
  {
    id: 'hs-mismatch',
    name: 'HS code mismatch (ambiguous BOM)',
    description: 'Two defensible classifications, 6.4% duty delta',
    passed: false,
    reason: 'Escalation required — regulatory risk exceeds autonomous-action threshold; routed to compliance specialist',
    agentConfidence: 71,
    taskSuccessPct: 88,
    criticalFailures: 0,
  },
  {
    id: 'carrier-delay',
    name: 'Carrier delay (port congestion)',
    description: 'Berthing slip +26h; feeder alternative available',
    passed: true,
    agentConfidence: 91,
    taskSuccessPct: 97,
    criticalFailures: 0,
  },
  {
    id: 'conflicting-eta',
    name: 'Conflicting ETA sources',
    description: 'Carrier API and client portal report ETAs 14h apart',
    passed: true,
    agentConfidence: 87,
    taskSuccessPct: 94,
    criticalFailures: 0,
  },
  {
    id: 'high-value',
    name: 'High-value shipment (₹25L+)',
    description: 'Financial-impact threshold crossed on duty correction',
    passed: false,
    reason: 'Escalation required — shipment value above autonomous financial-action ceiling; approval mandatory',
    agentConfidence: 76,
    taskSuccessPct: 90,
    criticalFailures: 0,
  },
]

export const EVALUATION_NOTE =
  'All figures on this screen are prototype/simulated data from a synthetic eval set of 214 cases. They demonstrate the measurement approach, not production performance.'
