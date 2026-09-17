# Reasoning Doc — Hexalog Exception-Resolution Prototype

**Author:** Yash N Shahdeo · yashnshahdeo@gmail.com
**Status:** Skeleton — full write-up in progress. Every claim about Hexalog's internal systems below is an assumption to validate, not a statement of fact.

---

## 1. Problem selection — why DOC_HOLD

See the **Taxonomy** screen for the scored selection table (Priority = Frequency + Repeatability + Value − Risk, each 1–5, illustrative). DOC_HOLD wins not because it is the most interesting problem but because it is the most repeatable one with real money attached. HS classification ambiguity is deliberately excluded from autonomous resolution — assistive only.

## 2. Workflow deconstruction — manual process → agentic task graph

Manual today: an exception appears in a queue; an ops executive chases documents across customs, carrier and client; quantifies duty/demurrage exposure from memory; proposes a fix; gets it approved; executes; updates the client. The prototype maps that to six agents: Detect → Investigate → Document → Quantify impact → Propose resolution → Execute (human-gated). Task graph per step: input, goal, tools, output — and boundaries ("must never").

## 3. Agent design and boundaries

Every agent card carries a **Must never** row. The two that matter most: the Document Agent never submits to a government portal or alters client-supplied documents; the Execution Agent never files, pays, or commits to a customer without recorded human sign-off.

## 4. Definition of Done — each threshold and the business risk it maps to

Seven metrics on the Evaluation screen, each tied to a business risk (not model metrics): resolution accuracy, escalation precision, human override rate (deliberately conservative — escalation by design), false-confidence rate (the metric that governs autonomy expansion), median time-to-resolution, regulatory incidents (hard zero), working capital released.

## 5. Evaluation and simulation strategy

Simulator = a digital twin of the exception workflow. Scenarios include pass, escalation (policy working), and one genuine failure (mis-attributed root cause caught at verification, not by a human — that distinction is the argument for the architecture).

## 6. Failure modes and blast radius

Per-exception "If this is wrong" cost lines on every exception detail. Wrong reclassification → duty shortfall, penalty exposure, licence risk — which is why that class is human-gated and why HS ambiguity is excluded from autonomy entirely.

## 7. Progressive autonomy roadmap with per-phase exit criteria

Phase 1 observe → Phase 2 recommend → Phase 3 low-risk auto → Phase 4 financial threshold → Phase 5 multi-lane. Each phase exits only on Definition-of-Done evidence, never on calendar time.

## 8. Business case with every assumption labelled

₹1,800/hr blended ops cost and 2.9h median handling are **assumptions** — to be replaced in Week 1 by loaded cost from Finance and time-and-motion shadowing. Roll-up: per-100-exceptions ≈ ₹4.2L saved, 230 ops-hours returned. Simulated math, method is the point.

## 9. Assumptions and open questions — the ten things I'd ask in Week 1

1. Does the orchestration platform expose event streams / document store / partner APIs in roughly the shape modelled?
2. Can exception records be written back, not only read?
3. What is the actual loaded ops cost per hour?
4. What is the real median handling time per DOC_HOLD?
5. Which systems are integrated enough to correlate one shipment across customs + carrier + warehouse?
6. What is the current DOC_HOLD volume per week on India–China / India–ME lanes?
7. Who signs off today — role, seniority, SLA?
8. What does a customs penalty actually cost in the worst recent case?
9. Which client segment (MSME vs enterprise) generates which exception classes?
10. What is the escalation org chart when the control tower executive is unavailable?

## 10. First 30 days

Week 1 validate assumptions (above). Week 2 shadow + instrument the manual flow. Week 3 build the thin slice: DOC_HOLD detection + evidence compilation. Week 4 Definition of Done draft with Vineet Malik's team + first shadow-mode evaluation on historical cases.

## 11. Kill criteria — what would make me stop

- Ground truth doesn't exist: if historical exception outcomes can't be reconstructed reliably, evaluation is unfalsifiable — stop.
- Integration cost explodes: if the platform can't expose the event/document layer without a multi-quarter replatform, the layer-on-top thesis dies.
- The override rate won't fall: if escalation precision stays low after Phase 3 tuning, the human gate is permanent and the ROI math inverts.
- Volume isn't there: if DOC_HOLD is < ~20 cases/week network-wide, the fixed cost of the eval infrastructure never pays back.
