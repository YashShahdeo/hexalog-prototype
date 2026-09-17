/**
 * §3.2 — problem-selection scoring. Scores are ILLUSTRATIVE — the real version is
 * built in Week 1 from 4–6 weeks of historical exception records. The method is
 * the point: Priority = Frequency + Repeatability + Value − Risk (each 1–5).
 */
export interface TaxonomyRow {
  exceptionClass: string
  freq: number
  repeatability: number
  valuePerCase: number
  riskIfWrong: number
  verdict: string
  verdictTone: 'build' | 'later' | 'assist'
}

export const TAXONOMY_ROWS: TaxonomyRow[] = [
  {
    exceptionClass: 'Customs DOC_HOLD',
    freq: 5,
    repeatability: 5,
    valuePerCase: 4,
    riskIfWrong: 2,
    verdict: 'Phase 1 — build here',
    verdictTone: 'build',
  },
  {
    exceptionClass: 'Failed delivery attempt',
    freq: 5,
    repeatability: 5,
    valuePerCase: 1,
    riskIfWrong: 1,
    verdict: 'Phase 3 — high volume, low value per case',
    verdictTone: 'later',
  },
  {
    exceptionClass: 'Carrier delay / port congestion',
    freq: 5,
    repeatability: 3,
    valuePerCase: 3,
    riskIfWrong: 2,
    verdict: 'Phase 5 — external dependency, low controllability',
    verdictTone: 'later',
  },
  {
    exceptionClass: 'Warehouse QC hold',
    freq: 3,
    repeatability: 4,
    valuePerCase: 3,
    riskIfWrong: 1,
    verdict: 'Phase 3 — contained risk, good second class',
    verdictTone: 'later',
  },
  {
    exceptionClass: 'RTO / reverse-logistics stuck',
    freq: 3,
    repeatability: 4,
    valuePerCase: 2,
    riskIfWrong: 1,
    verdict: 'Phase 3',
    verdictTone: 'later',
  },
  {
    exceptionClass: 'Duty overpayment refund',
    freq: 2,
    repeatability: 5,
    valuePerCase: 4,
    riskIfWrong: 3,
    verdict: 'Phase 4 — financial action, needs threshold policy',
    verdictTone: 'later',
  },
  {
    exceptionClass: 'HS classification ambiguity',
    freq: 3,
    repeatability: 2,
    valuePerCase: 5,
    riskIfWrong: 5,
    verdict: 'Not automatable — assistive only, specialist decides',
    verdictTone: 'assist',
  },
]

export const TAXONOMY_NOTE_1 =
  'Scoring is illustrative — the real version is built in Week 1 from 4–6 weeks of historical exception records. The method is the point: automate where frequency and repeatability are high and the cost of being wrong is contained. DOC_HOLD wins not because it is the most interesting problem but because it is the most repeatable one with real money attached.'

export const TAXONOMY_NOTE_2 =
  'HS classification scores lowest and is deliberately excluded from autonomous resolution. It is high-value but low-repeatability and carries regulatory consequence — the right answer there is to compile the dossier faster for a human specialist, not to decide.'

export const TAXONOMY_EVAL_NOTE =
  'Eval set: 50–100 historical exceptions per class with ground-truth root causes and the resolution that actually worked, held out from anything the agents learn from. Every verified outcome in production adds to it.'
