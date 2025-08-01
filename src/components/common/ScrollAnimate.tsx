import React, { useEffect, useRef } from 'react';

interface ScrollAnimateProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'slideRight' | 'slideLeft' | 'scaleIn';
  delay?: number;
  threshold?: number;
  className?: string;
  triggerOnce?: boolean;
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  threshold = 0.1,
  className = '',
  triggerOnce = true,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animationClasses = {
      fadeUp: 'scroll-animate',
      slideRight: 'scroll-animate-right',
      slideLeft: 'scroll-animate-left',
      scaleIn: 'scroll-animate-scale',
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, delay);
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
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Add the base animation class
    element.classList.add(animationClasses[animation]);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [animation, delay, threshold, triggerOnce]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimate;
