import { useState } from 'react'
import { EXCEPTIONS } from '../data/exceptions'
import { LedgerRow } from '../components/ExceptionRow'
import { SimulatedDataNote } from '../components/SimulatedDataNote'
import type { ExceptionCategory } from '../types'

type Filter = 'all' | ExceptionCategory

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'customs', label: 'Customs' },
  { id: 'freight', label: 'Freight' },
  { id: 'warehouse', label: 'Warehouse' },
  { id: 'last_mile', label: 'Last-mile' },
  { id: 'reverse_logistics', label: 'Reverse logistics' },
]

export function ExceptionLedger({ onOpenException }: { onOpenException: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>('all')

  const rows = EXCEPTIONS.filter((e) => filter === 'all' || e.category === filter).sort((a, b) => {
    const rank = { high: 0, medium: 1, low: 2 }
    const statusRank = { new: 0, in_review: 1, resolved: 2 }
    return rank[a.slaRisk] - rank[b.slaRisk] || statusRank[a.status] - statusRank[b.status]
  })

  return (
    <div className="pt-6 pb-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink-900">Exception Ledger</h1>
        <p className="mt-1 text-[13.5px] text-ink-600">
          The full queue — sorted by business risk, not recency.
        </p>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-card border border-b-0 border-ink-900/8 bg-soft-lavender/60 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="data text-[12.5px] font-semibold text-ink-900">{rows.length} entries</span>
          <span className="rounded-full bg-brand-purple/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-brand-purple">
            Sorted by SLA risk
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                filter === f.id
                  ? 'bg-brand-purple text-white'
                  : 'border border-ink-900/10 bg-white text-ink-600 hover:border-brand-purple/40 hover:text-brand-purple'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[90px_minmax(0,1fr)_90px_90px_90px_100px_100px] items-center gap-4 border-b border-ink-900/8 bg-white px-5 py-2.5 text-[10.5px] font-bold uppercase tracking-wider text-ink-400">
        <span>Severity</span>
        <span>Exception</span>
        <span>Category</span>
        <span title="Derived from the resolution plan: every step auto → Auto-eligible; any regulatory/financial step → Human-gated; mixed plans → Partial.">Autonomy</span>
        <span>AI confidence</span>
        <span>Status</span>
        <span />
      </div>

      {/* Rows */}
      <div className="overflow-hidden rounded-b-card border border-t-0 border-ink-900/8 bg-white shadow-card">
        {rows.map((e) => (
          <LedgerRow key={e.id} exception={e} onOpen={onOpenException} />
        ))}
        {rows.length === 0 && (
          <p className="px-5 py-8 text-center text-[13px] text-ink-400">No exceptions in this category.</p>
        )}
      </div>

      <div className="mt-6">
        <SimulatedDataNote />
      </div>
    </div>
  )
}
