export function HexMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 1.8 21 7v10l-9 5.2L3 17V7l9-5.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 7.2 16.5 9.8v5L12 17.4 7.5 14.8v-5L12 7.2Z" fill="currentColor" opacity="0.85" />
    </svg>
  )
}

export function LogoLockup({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={dark ? 'text-white' : 'text-brand-purple'}>
        <HexMark />
      </span>
      <span
        className={`text-[17px] font-bold tracking-tight ${dark ? 'text-white' : 'text-brand-deep'}`}
      >
        hexalog
      </span>
      <span className="ml-1 rounded-full border border-brand-purple/30 bg-soft-lavender px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-purple">
        concept
      </span>
    </div>
  )
}
