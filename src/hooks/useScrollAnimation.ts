import { useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (
  animationClass = 'scroll-animate',
  options: UseScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('animate');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Add the base animation class
    element.classList.add(animationClass);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [animationClass, threshold, rootMargin, triggerOnce]);

  return elementRef;
};

export const useStaggeredScrollAnimation = (
  baseAnimationClass = 'scroll-animate',
  staggerDelay = 100,
  options: UseScrollAnimationOptions = {}
) => {
  const containerRef = useRef<HTMLElement>(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate');
              }, index * staggerDelay);
            });
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            children.forEach((child) => {
              child.classList.remove('animate');
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Add the base animation class to all children
    children.forEach((child) => {
      child.classList.add(baseAnimationClass);
    });

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [baseAnimationClass, staggerDelay, threshold, rootMargin, triggerOnce]);

  return containerRef;
};
