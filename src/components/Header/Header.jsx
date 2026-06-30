import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSparkles } from 'react-icons/hi';
import Container from '../Container/Container';
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/data';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { fadeDown } from '../../utils/animations';

/**
 * Sticky header with blur-on-scroll, desktop nav, and mobile hamburger menu.
 */
export default function Header({ scrollTo, onChatToggle, isChatOpen }) {
  const { isScrolled } = useScrollPosition();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  /* Track which section is currently in the viewport */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileOpen(false);
    if (scrollTo) {
      scrollTo(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-lg shadow-primary/10'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2 text-xl font-bold text-neutral-white transition-colors"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-extrabold text-neutral-white transition-all duration-300 group-hover:glow-accent">
              {PERSONAL_INFO.firstName[0]}
            </span>
            <span className="hidden sm:inline">
              {PERSONAL_INFO.firstName}
              <span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.href
                      ? 'text-accent'
                      : 'text-neutral-gray hover:text-neutral-white'
                  }`}
                >
                  {link.label}
                  {/* Active indicator underline */}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Chat Button */}
            <motion.button
              type="button"
              onClick={onChatToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                isChatOpen
                  ? 'bg-accent text-white shadow-[0_0_20px_rgba(54,173,163,0.4)]'
                  : 'border border-accent/30 text-accent hover:bg-accent/10'
              }`}
              aria-label={isChatOpen ? 'Close chatbot' : 'Open chatbot'}
              title="AI Assistant"
            >
              <HiSparkles size={18} />
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-white transition-colors hover:bg-white/10 md:hidden"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="glass px-4 pb-6 pt-4">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3, ease: 'easeOut' }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        activeSection === link.href
                          ? 'bg-accent/10 text-accent'
                          : 'text-neutral-gray hover:bg-white/5 hover:text-neutral-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
