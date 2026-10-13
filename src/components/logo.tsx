'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export const Logo = forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-2.5 text-foreground', className)}
    >
      <img
        src="/logo.png"
        alt="MD Agro Solution"
        className="h-8 w-8 object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-tight">MD Agro</span>
        <span className="text-[10px] font-medium text-muted-foreground tracking-wide uppercase">
          Solution
        </span>
      </div>
    </div>
  );
});

Logo.displayName = 'Logo';
