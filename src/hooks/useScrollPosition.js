import { useState, useEffect } from 'react';

/**
 * Track the current scroll position of the window.
 * Used primarily for the header blur-on-scroll effect.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setIsScrolled(currentY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, isScrolled };
}
