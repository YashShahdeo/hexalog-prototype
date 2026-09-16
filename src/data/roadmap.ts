import type { RoadmapPhase, ValueLever } from '../types'

export const NORTH_STAR = {
  metric: 'Exception Resolution Success Rate',
  target: '≥ 90%',
  definition: 'Exceptions resolved end-to-end with verified outcome and zero critical failures — measured weekly, not assumed.',
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phaseNumber: 1,
    name: 'Observe',
    description: 'Shadow live ops: agents detect, investigate and draft — nothing executes. Every output reviewed by a human.',
    timeframe: 'Weeks 1–2',
    businessValue: 'Baseline data on exception patterns without operational risk',
  },
  {
    phaseNumber: 2,
    name: 'Recommend',
    description: 'System proposes root cause, impact and resolution plan; humans decide and execute everything.',
    timeframe: 'Weeks 3–6',
    businessValue: '↓ Investigation time per exception; consistent plan quality',
  },
  {
    phaseNumber: 3,
    name: 'Assist',
    description: 'Low-risk steps (doc requests, notifications, internal checks) execute automatically with audit trail.',
    timeframe: 'Weeks 7–10',
    businessValue: '↓ Ops handling time; faster cycle on routine exceptions',
  },
  {
    phaseNumber: 4,
    name: 'Resolve',
    description: 'End-to-end resolution for a narrow, high-confidence exception class — regulatory/financial steps still human-gated.',
    timeframe: 'Weeks 11–16',
    businessValue: 'Autonomous resolution on ~30–40% of exception volume (target class)',
  },
  {
    phaseNumber: 5,
    name: 'Optimize',
    description: 'Expand coverage class-by-class as evaluation metrics prove accuracy, risk and value thresholds are met.',
    timeframe: 'Scale',
    businessValue: 'Compounding: each verified outcome improves the eval set and policy boundaries',
  },
]

export const VALUE_LEVERS: ValueLever[] = [
  { capability: 'Less manual investigation', metric: '↓ Ops handling time per exception' },
  { capability: 'Earlier detection (pre-SLA breach)', metric: '↓ SLA misses and penalty exposure' },
  { capability: 'Evidence-backed escalation, fewer errors', metric: '↓ Customs rework and amendment filings' },
  { capability: 'Verified-outcome data loop', metric: '↑ Resolution accuracy over time' },
]

export const FIRST_TWO_WEEKS: string[] = [
  'Shadow 2–3 control tower executives through live exception handling; log every system consulted and minute spent',
  'Map the exception taxonomy from 4–6 weeks of historical cases; identify the highest-frequency, most-repeatable class',
  'Select one workflow (e.g., customs DOC_HOLD) and define its Definition of Done with Vineet Malik\'s team',
  'Build an evaluation set of 50–100 historical exceptions with ground-truth root causes and resolutions',
  'Validate the detect→investigate→propose loop against the eval set; report accuracy, override rate and time savings',
]

export const CLOSING_CONDITION = 'Automate only where accuracy, risk and business value justify it.'
