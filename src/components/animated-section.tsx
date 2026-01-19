'use client';

import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  className, 
  animationClass = 'animate-slide-up',
  delay = 0
}: AnimatedSectionProps) {
  const [ref, isOnScreen] = useOnScreen({
    threshold: 0.1,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOnScreen) {
      // Add a delay if specified
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOnScreen, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        !isVisible && 'opacity-0',
        isVisible && animationClass
      )}
    >
      {children}
    </div>
  );
}