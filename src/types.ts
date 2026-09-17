export type Severity = 'high' | 'medium' | 'low'
export type ExceptionStatus = 'new' | 'in_review' | 'resolved'
export type AutonomyLevel = 'auto' | 'recommend' | 'human'
export type ExceptionCategory = 'customs' | 'freight' | 'warehouse' | 'last_mile' | 'reverse_logistics'

/** Client segment — MSME lens is Hexalog's stated thesis (CEO, YourStory). */
export type ClientSegment = 'msme_d2c' | 'enterprise'

export interface ExceptionEvidence {
  label: string
  value: string
  source: string
}

export interface ExceptionBusinessImpact {
  currentDelayHours: number
  predictedDelayRange: string
  shipmentValue: string
  slaStatus: string
  estimatedCost: string
}

/** Working-capital framing — a held shipment is locked capital, not just a delay. */
export interface WorkingCapitalImpact {
  lockedAmount: string
  lockedSince: string
  atRiskPromise: string
}

export interface ResolutionStep {
  step: number
  action: string
  owner: string
  autonomy: AutonomyLevel
}

export interface Exception {
  id: string
  shipmentId: string
  route: string
  title: string
  category: ExceptionCategory
  severity: Severity
  status: ExceptionStatus
  confidence: number
  slaRisk: 'high' | 'medium' | 'low'

  /** Root cause one-liner for the summary strip (screen 03) */
  rootCause: string
  /** "Next step" line for the summary strip (screen 03) */
  nextStep: string

  /** Distinct callout rendered above the evidence trail (e.g. HS-case filing-accuracy framing) */
  topNote?: string
  /** Blast radius if the AI's call is wrong — the cost of being wrong */
  wrongCost?: string

  evidenceTrail: ExceptionEvidence[]
  businessImpact: ExceptionBusinessImpact
  /** Client context for the MSME working-capital lens (screen 03 impact aside) */
  clientSegment: ClientSegment
  clientName: string
  workingCapital?: WorkingCapitalImpact
  resolutionPlan: ResolutionStep[]
}

export interface AgentSourceInfo {
  /** What this source would be in a production Hexalog deployment. */
  productionSystem: string
  /** Honest status of the integration that would supply it. */
  integrationStatus: string
}

export interface Agent {
  id: string
  name: string
  input: string
  goal: string
  tools: string
  output: string
  confidence: number
  autonomy: AutonomyLevel
  /** Hard boundary — what this agent is never allowed to do. */
  mustNever: string
}

export interface EvaluationMetric {
  name: string
  target: string
  simulatedCurrent: string
  status: 'pass' | 'fail'
}

export interface SimulationScenario {
  id: string
  name: string
  description: string
  passed: boolean
  /** pass = resolved within policy · escalation = policy working · failure = agent wrong, caught at verification */
  outcome?: 'pass' | 'escalation' | 'failure'
  reason?: string
  /** "What we'd do about it" — next autonomy step on a pass, human path on an escalation */
  escalationPath?: string
  agentConfidence?: number
  taskSuccessPct?: number
  criticalFailures?: number
}

export interface RoadmapPhase {
  phaseNumber: number
  name: string
  description: string
  timeframe: string
  businessValue: string
}

export interface ValueLever {
  capability: string
  metric: string
}
