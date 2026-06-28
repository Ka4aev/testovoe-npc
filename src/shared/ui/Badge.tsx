import type { PropsWithChildren } from 'react';
import { cn } from '../lib';

type BadgeTone = 'blue' | 'emerald' | 'amber' | 'rose' | 'violet' | 'slate';

type BadgeProps = PropsWithChildren<{
  tone?: BadgeTone;
}>;

const toneClasses: Record<BadgeTone, string> = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200',
  violet: 'bg-violet-50 text-violet-700 ring-violet-200',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
};

export function Badge({ children, tone = 'slate' }: BadgeProps) {
  return (
    <span className={cn('inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ring-1', toneClasses[tone])}>
      {children}
    </span>
  );
}
