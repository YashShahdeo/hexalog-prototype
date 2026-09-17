import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'md' | 'lg'
  children: ReactNode
}

const BASE =
  'inline-flex items-center justify-center gap-2 font-bold transition-all disabled:cursor-default disabled:opacity-60'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-purple text-white hover:bg-brand-deep disabled:bg-soft-lavender disabled:text-ink-400',
  secondary:
    'border border-brand-purple/40 bg-white text-brand-purple hover:border-brand-purple hover:bg-soft-lavender',
}

const SIZES = {
  md: 'rounded-lg px-4 py-2.5 text-[13px]',
  lg: 'rounded-lg px-5 py-3 text-[13.5px]',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonProps) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
