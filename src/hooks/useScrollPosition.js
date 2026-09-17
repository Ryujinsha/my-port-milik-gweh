import { useState, useEffect } from 'react';

/**
 * Track the current scroll position of the window.
 * Used primarily for the header blur-on-scroll effect.
 */
export function useScrollPosition() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled };
}
