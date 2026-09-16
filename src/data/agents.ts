import type { Agent } from '../types'

export const AGENTS: Agent[] = [
  {
    id: 'detection',
    name: 'Detection Agent',
    input: 'Real-time event streams: customs feed, carrier APIs, warehouse WMS, last-mile app',
    goal: 'Spot anomalies and open exceptions the moment they form — before a human notices',
    tools: 'Event listeners, threshold rules, anomaly detection against historical baselines',
    output: 'New exception records with severity, category and initial confidence score',
    confidence: 92,
    autonomy: 'auto',
  },
  {
    id: 'investigation',
    name: 'Investigation Agent',
    input: 'Exception record + linked shipment, documents and event history',
    goal: 'Establish the most likely root cause with cited evidence — never a bare guess',
    tools: 'Document store queries, carrier/port feeds, historical case retrieval (1,842 cases)',
    output: 'Ranked root-cause hypothesis with numbered evidence trail and confidence %',
    confidence: 84,
    autonomy: 'auto',
  },
  {
    id: 'document',
    name: 'Document Agent',
    input: 'Required document set per shipment lane + what actually exists',
    goal: 'Find gaps, request missing documents, validate contents against manifests',
    tools: 'Document store, email/portal templates, field-level validation rules',
    output: 'Doc gap report, drafted requests, validated documents ready for filing',
    confidence: 88,
    autonomy: 'auto',
  },
  {
    id: 'impact',
    name: 'Impact Agent',
    input: 'Root cause + shipment metadata (value, SLA, lane, client)',
    goal: 'Quantify business impact: delay, SLA risk, operational cost',
    tools: 'SLA contracts, delay-distribution models from historical cases, cost tables',
    output: 'Impact panel: current/predicted delay, SLA status, estimated cost',
    confidence: 86,
    autonomy: 'recommend',
  },
  {
    id: 'resolution',
    name: 'Resolution Agent',
    input: 'Root cause + impact quantification + available resolution patterns',
    goal: 'Propose the best resolution plan with per-step autonomy assignment',
    tools: 'Resolution playbook library, partner network quotes, policy engine',
    output: 'Numbered resolution plan: action, owner, autonomy level per step',
    confidence: 82,
    autonomy: 'recommend',
  },
  {
    id: 'execution',
    name: 'Execution Agent',
    input: 'Human-approved resolution plan steps',
    goal: 'Execute approved steps, verify outcomes, close the loop with evidence',
    tools: 'Portal submissions, partner APIs, notification services, verification checks',
    output: 'Execution checklist with completion status + verified outcome record',
    confidence: 95,
    autonomy: 'recommend',
  },
]

export const ORCHESTRATION_PRINCIPLE =
  'Agents are narrow, observable and policy-bound — not one unrestricted AI.'
