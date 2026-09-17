# Demo Walkthrough — Hexalog Exception-Resolution Prototype

Script for the Loom recording you'll link in the cold email. **4 minutes, hard cap.** Recipient: Shobhit Singh (Co-founder & CPTO). Every number on screen is simulated and labeled as such — say so once, early, and keep moving.

---

## Cold-email framing (the spine)

- **Hook:** their own promise — *"scale without expanding your ops team."*
- **Gap:** their platform detects and validates; resolution is still the ops team's manual scramble.
- **Proof:** a resolution layer ON their orchestration platform — evidence trails, agent boundaries, human-gated regulatory steps, and a measured evaluation harness.
- **The number:** ~230 ops hours and ₹4.2L avoided per 100 exceptions/month (simulated model, assumptions labeled).
- **Close:** 20 minutes with you or Vineet's team — or just open the link; the hero case runs end to end. Happy to be wrong about the architecture assumptions.

---

## Running order (4:00)

| # | Time | Screen | What to show | What to say |
|---|------|--------|--------------|-------------|
| 1 | 0:00–0:35 | **Exception Detail** (HXL001351, Shanghai → Mumbai) | One exception end to end: topNote callout (filing accuracy defended), evidence trail, working-capital card | "One customs DOC_HOLD on a lane you run today. Every claim is cited. Note the framing: your 100% HS filing accuracy isn't in question — the exposure is the shipper's BOM ambiguity. And for an MSME brand this is locked working capital, not a delay." |
| 2 | 0:35–1:05 | **AI Agents** | Six agent cards — land on the red **Must never** rows | "Six narrow agents on your orchestration platform — not a parallel system. Each has boundaries. The Document Agent can't touch a government portal. Execution can't file without recorded human sign-off." |
| 3 | 1:05–1:35 | **Evaluation — Definition of Done** | **Stop on the FAIL row** (human override 11.3% vs ≤10%) | "The one metric we currently miss — deliberately. The threshold is conservative because escalation by design beats silent failure. Tuning it is a roadmap decision, not a demo fix." |
| 4 | 1:35–2:00 | **Approve → Execute → Verify** | Type a rejection reason, hit **Reject plan — send back with reason**; show the halted state; then Reset, Approve, watch it run and verify | "The human gate is real — reject the plan and nothing executes; the reason lands in the audit log. Approve, and regulatory steps stay human while agents run the rest — verified, not assumed." |
| 5 | 2:00–2:40 | **Simulator** | Run **Mis-attributed root cause** — the failure scenario | "And this is the agent being wrong: 91% confident, wrong anyway — caught at verification, not by a customer. Critical failures still zero because the architecture contains it. The case becomes eval data and a new detection rule." |
| 6 | 2:40–3:00 | **Assumptions badge** (header, any screen) | Open the popover — three columns: assumed / known / simulated | "Everything I've assumed about your internals is here, flagged for validation in week one. Naming assumptions is the job." |
| 7 | 3:00–3:30 | **Taxonomy** | The scored selection table | "Why DOC_HOLD and not the other six classes — scored on frequency, repeatability, value, and the cost of being wrong. HS ambiguity scores lowest: assistive only, a specialist decides." |
| 8 | 3:30–4:00 | **Roadmap & ROI** | Roll-up card (₹4.2L / 230h per 100 exceptions, labeled assumptions), phased autonomy, closing line | "Per 100 exceptions a month, ~230 ops hours and ₹4.2L — every input labeled as an assumption with a week-one validation plan. This is the exception-handling spine of the AI logistics assistant the seed round funds; it ports lane-by-lane as MEA and SEA open. I'd value 20 minutes." |

---

## Recording tips

- **Resolution:** 1920×1080, browser zoom 100–110%, hide bookmarks bar.
- **Cursor:** deliberate moves; pause half a beat before each scroll so cuts are clean.
- **Keep real-time pacing** only on the Approval execution animation (shot 4) — trim everything else.
- **GIF alternative:** shots 1→4 (~2 min is too long for a GIF; use shots 3→5, ~65s) if the email needs an inline visual; link the Loom for the full pass.
- **First frame of shot 1** doubles as the email thumbnail.
- Say the simulated-data disclaimer once (shot 1), not repeatedly.
- Don't mention hexalog.com — only hexalog.in matters here.

---

## DEPLOY

Static Vite build — zero config required.

```bash
npm run build
npx vercel --prod
```

### Mobile check (before sending)

Open the deployed URL at **390px width** (DevTools device toolbar, or your phone):

- [ ] WhyWorkflow: hero, win strip and footer stack cleanly; no horizontal scroll
- [ ] Every in-app screen: StepTracker scrolls horizontally; Assumptions badge visible; no horizontal page scroll
- [ ] Ledger: rows render as stacked cards (no table scroll); filters wrap
- [ ] Exception Detail: right-hand impact panel moves below the evidence trail
- [ ] Agents: single column; Must-never rows readable
- [ ] Approve: three columns stack in order (approval → execution → verify); Reject path usable by thumb
- [ ] Taxonomy table: horizontally scrollable with visible scroll affordance
- [ ] Tap targets ≥ 44px everywhere

### Pre-send QA

- [ ] `npm run build` — zero errors
- [ ] Grep clean: `grep -rn "V. Malik\|1,842\|step stay\|across 6 lanes\|Otis" src/ *.md index.html` → zero matches
- [ ] Functional: High-value shipment → Escalation required; Mis-attributed root cause → Failed, caught at verification; Reject path records reason and halts; Reset restores approve state
- [ ] Assumptions badge on every in-app screen; footer on every screen incl. WhyWorkflow
- [ ] `docUrl` placeholder does **not** render as a dead link (fill `AUTHOR.docUrl` in `src/data/hexalogStory.ts` once the reasoning doc is hosted)
- [ ] OG preview: paste the deployed URL into a Slack draft — card renders with title, description, image
- [ ] Fill `AUTHOR.linkedin` / `AUTHOR.portfolio` from the resume header before sending
