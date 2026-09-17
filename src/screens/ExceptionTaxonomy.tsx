import { ListFilter } from 'lucide-react'
import { StepTracker } from '../components/StepTracker'
import { AuthorFooter } from '../components/AuthorFooter'
import {
  TAXONOMY_ROWS,
  TAXONOMY_NOTE_1,
  TAXONOMY_NOTE_2,
  TAXONOMY_EVAL_NOTE,
} from '../data/taxonomy'

const TONE_STYLES = {
  build: 'bg-brand-purple text-white',
  later: 'bg-soft-lavender text-ink-600',
  assist: 'bg-[#FDECEC] text-[#B03030]',
}

export function ExceptionTaxonomy() {
  return (
    <div className="pt-6 pb-6 sm:px-6 lg:px-8">
      <StepTracker current="taxonomy" />
      <header className="mb-6">
        <h1 className="flex items-center gap-2.5 text-[26px] font-bold tracking-tight text-ink-900">
          <ListFilter size={20} className="text-brand-purple" /> Exception Taxonomy &amp; Selection
        </h1>
        <p className="mt-1 text-[13.5px] text-ink-600">
          The prototype shows the answer — DOC_HOLD. This screen shows the choice: every exception class scored,
          and why one wins.
        </p>
      </header>

      <p className="mb-3 text-[11.5px] leading-relaxed text-ink-600">
        All dimensions scored 1–5. Higher RISK = more dangerous to automate.{' '}
        <span className="font-semibold text-ink-900">Priority = Freq + Repeat + Value − Risk.</span>
      </p>

      <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <table className="w-full min-w-[760px] overflow-hidden rounded-card border border-ink-900/8 bg-white text-left shadow-card">
          <thead>
            <tr className="border-b border-ink-900/8 bg-soft-lavender/60 text-[10.5px] uppercase tracking-wider text-ink-400">
              <th className="px-5 py-3 font-bold">Exception class</th>
              <th className="px-3 py-3 text-center font-bold" title="How often the class occurs (1–5, illustrative)">
                Freq
              </th>
              <th
                className="px-3 py-3 text-center font-bold"
                title="How similarly each case resolves (1–5, illustrative)"
              >
                Repeat
              </th>
              <th
                className="px-3 py-3 text-center font-bold"
                title="Working capital / duty at stake per case (1–5, illustrative)"
              >
                Value
              </th>
              <th
                className="px-3 py-3 text-center font-bold"
                title="Blast radius if the automated call is wrong (1–5, illustrative)"
              >
                Risk
              </th>
              <th className="px-3 py-3 text-center font-bold" title="Frequency + Repeatability + Value − Risk">
                Priority
              </th>
              <th className="px-5 py-3 font-bold">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {TAXONOMY_ROWS.map((r) => {
              const priority = r.freq + r.repeatability + r.valuePerCase - r.riskIfWrong
              return (
                <tr key={r.exceptionClass} className="border-b border-ink-900/6 last:border-b-0">
                  <td className="px-5 py-3 text-[13px] font-semibold text-ink-900">{r.exceptionClass}</td>
                  <td className="data px-3 py-3 text-center text-[12.5px] text-ink-600">{r.freq}</td>
                  <td className="data px-3 py-3 text-center text-[12.5px] text-ink-600">{r.repeatability}</td>
                  <td className="data px-3 py-3 text-center text-[12.5px] text-ink-600">{r.valuePerCase}</td>
                  <td className="data px-3 py-3 text-center text-[12.5px] text-ink-600">{r.riskIfWrong}</td>
                  <td
                    className={`data px-3 py-3 text-center text-[14px] font-bold ${
                      priority >= 10 ? 'text-brand-purple' : 'text-ink-600'
                    }`}
                  >
                    {priority}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${TONE_STYLES[r.verdictTone]}`}
                    >
                      {r.verdict}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-card border border-ink-900/8 bg-white p-5 shadow-card">
          <p className="text-[10.5px] font-bold uppercase tracking-widest text-brand-purple">Why DOC_HOLD wins</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-600">{TAXONOMY_NOTE_1}</p>
        </div>
        <div className="rounded-card border border-ink-900/8 bg-white p-5 shadow-card">
          <p className="text-[10.5px] font-bold uppercase tracking-widest text-[#B03030]">
            Why HS classification is excluded
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-600">{TAXONOMY_NOTE_2}</p>
        </div>
      </div>

      <div className="mt-4 rounded-card border border-brand-purple/15 bg-soft-lavender px-5 py-3.5">
        <p className="text-[12px] leading-relaxed text-ink-900">{TAXONOMY_EVAL_NOTE}</p>
      </div>

      <div className="mt-4">
        <AuthorFooter />
      </div>
    </div>
  )
}
