'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { SkeletonLoader } from './skeleton-loader';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  placeholderType?: 'blur' | 'skeleton';
  skeletonClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  placeholderType = 'skeleton',
  skeletonClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <SkeletonLoader 
          className={skeletonClassName || `absolute inset-0 ${props.className || ''}`} 
        />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={`${props.className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </>
  );
}