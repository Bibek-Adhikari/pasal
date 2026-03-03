"use client";

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { scrollTo } from '@/services/navigation';

function ScrollHandlerContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section');

  useEffect(() => {
    if (section) {
      // Small timeout to ensure the DOM is ready for certain browsers/Next.js hydration states
      const timer = setTimeout(() => {
        scrollTo(section);
        
        // Optionally clean up the URL from the section parameter after scrolling
        // window.history.replaceState({}, '', window.location.pathname);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [section]);

  return null;
}

export function ScrollHandler() {
  return (
    <Suspense fallback={null}>
      <ScrollHandlerContent />
    </Suspense>
  );
}
