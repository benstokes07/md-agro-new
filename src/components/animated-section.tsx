import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  delay?: number;
}

// Server-compatible version that renders consistently
export function AnimatedSection({ 
  children, 
  className, 
  animationClass = 'animate-slide-up',
  delay = 0
}: AnimatedSectionProps) {
  // For server components, always render with animation to avoid hydration mismatch
  // The animation will trigger naturally when the client hydrates
  return (
    <div
      className={cn(
        className,
        animationClass,
        delay > 0 && `delay-[${delay}ms]`
      )}
    >
      {children}
    </div>
  );
}