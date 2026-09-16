export type Severity = 'high' | 'medium' | 'low'
export type ExceptionStatus = 'new' | 'in_review' | 'resolved'
export type AutonomyLevel = 'auto' | 'recommend' | 'human'
export type ExceptionCategory = 'customs' | 'freight' | 'warehouse' | 'last_mile'

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

  evidenceTrail: ExceptionEvidence[]
  businessImpact: ExceptionBusinessImpact
  resolutionPlan: ResolutionStep[]
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
  reason?: string
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
