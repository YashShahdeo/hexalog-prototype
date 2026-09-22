import { Info } from 'lucide-react'

export function SimulatedDataNote({ text }: { text?: string }) {
  return (
    <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-ink-400">
      <Info size={12} className="mt-0.5 shrink-0" />
      {text ??
        'All figures on this screen are illustrative/simulated for the concept prototype - not production Hexalog data.'}
    </p>
  )
}

export function SimulatedDataBanner({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-card border border-[#F0E1A0] bg-[#FDF6DC] px-4 py-3">
      <Info size={15} className="mt-0.5 shrink-0 text-[#8A6D0A]" />
      <p className="text-[12.5px] leading-relaxed text-[#8A6D0A]">{text}</p>
    </div>
  )
}
