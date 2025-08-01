import { useEffect } from 'react';

// Utility to automatically add scroll animations to elements
export const initializeScrollAnimations = () => {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Automatically add scroll animations to common elements
  const selectors = [
    '.card-hover',
    '[class*="scroll-animate"]',
    '.tool-card',
    '.contract-card',
    '.stats-card',
  ];

  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      // Add base animation class if not present
      if (!element.classList.contains('scroll-animate') && 
          !element.classList.contains('scroll-animate-right') &&
          !element.classList.contains('scroll-animate-left') &&
          !element.classList.contains('scroll-animate-scale')) {
        element.classList.add('scroll-animate');
      }
      
      // Add staggered delay
      (element as HTMLElement).style.setProperty('--animation-delay', `${index * 0.1}s`);
      
      observer.observe(element);
    });
  });

  return () => {
    observer.disconnect();
  };
};

// Hook to use in React components
export const useAutoScrollAnimations = () => {
  useEffect(() => {
    const cleanup = initializeScrollAnimations();
    return cleanup;
  }, []);
};
