export function HexMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 46 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M7.65511 8.68054L0.531124 12.8892L22.545 25.9025L30.0921 21.4836L23.059 17.3109L29.4774 13.5935L36.7217 17.8372L44.6218 13.0669L22.7488 0.0540079L14.6374 4.82372L20.6156 8.35993L13.9853 12.288L7.65511 8.68054Z"
        fill="#8F62DF"
      />
      <path
        d="M22.2544 27L0.492188 14L0.0276275 37.9458L22.2544 50.3257L22.2544 27Z"
        fill="#442A59"
      />
      <path
        d="M45.3879 14.1025L23.0992 27.2985L23.0992 50.4686L45.3866 37.9153L45.3879 14.1025Z"
        fill="#442A59"
      />
      <path
        d="M22.9922 27L45.4922 14V38L22.9922 50.5V27Z"
        fill="#744C8A"
      />
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
