"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { forwardRef } from 'react';

export const Logo = forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  return (
    <div 
      ref={ref}
      className={cn("flex items-center gap-2 text-2xl font-bold text-primary", className)}
    >
      <img src="/logo.png" alt="MD-Agro Solution & Trading Company Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
      <span className="font-headline text-sm md:text-sm lg:text-base">MD Agro Solution</span>
    </div>
  );
});

Logo.displayName = 'Logo';