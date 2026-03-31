import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gold text-charcoal-dark hover:bg-gold/90',
        secondary: 'border-transparent bg-white/10 text-white hover:bg-white/20',
        destructive: 'border-transparent bg-red-500/20 text-red-400 hover:bg-red-500/30',
        outline: 'text-white border-white/20',
        gold: 'border-transparent bg-gradient-gold text-charcoal-dark',
        success: 'border-transparent bg-green-500/20 text-green-400 hover:bg-green-500/30',
        warning: 'border-transparent bg-amber-500/20 text-amber-400 hover:bg-amber-500/30',
        pending: 'border-transparent bg-blue-500/20 text-blue-400 hover:bg-blue-500/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
