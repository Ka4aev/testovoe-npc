import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex rounded-2xl px-4 py-2.5 text-sm font-semibold transition',
        variant === 'primary' ? 'bg-slate-950 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
        className,
      )}
      {...props}
    />
  );
}
