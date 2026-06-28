import type { HTMLAttributes } from 'react';
import { cn } from '../lib';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={cn('rounded-3xl border border-slate-200 bg-white p-6 shadow-sm', className)} {...props} />;
}
