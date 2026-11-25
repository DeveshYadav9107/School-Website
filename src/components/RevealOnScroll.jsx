'use client';

import React, { useEffect, useRef, useState } from 'react';

export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  threshold = 0.06,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const hiddenMap = {
    'fade-up': 'opacity-0 translate-y-6',
    'fade-in': 'opacity-0',
    'scale': 'opacity-0 scale-95',
    'slide-left': 'opacity-0 translate-x-6',
    'slide-right': 'opacity-0 -translate-x-6',
  };

  const visibleMap = {
    'fade-up': 'opacity-100 translate-y-0',
    'fade-in': 'opacity-100',
    'scale': 'opacity-100 scale-100',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0',
  };

  const transitionClass = isVisible
    ? visibleMap[variant] || visibleMap['fade-up']
    : hiddenMap[variant] || hiddenMap['fade-up'];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${transitionClass} ${className}`}
    >
      {children}
    </div>
  );
}
