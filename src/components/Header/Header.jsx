import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSparkles } from 'react-icons/hi';
import Container from '../Container/Container';
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/data';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { fadeDown } from '../../utils/animations';

/**
 * Sticky header with neumorphic styling on scroll, desktop nav, and mobile hamburger menu.
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
          ? 'neu-raised-sm'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2 text-xl font-bold transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            <span
              className="neu-btn flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold transition-all duration-300"
              style={{ color: 'var(--accent-highlight)' }}
            >
              {PERSONAL_INFO.firstName[0]}
            </span>
            <span className="hidden sm:inline">
              {PERSONAL_INFO.firstName}
              <span style={{ color: 'var(--accent-primary)' }}>.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.href
                      ? ''
                      : 'hover:text-neutral-white'
                  }`}
                  style={{
                    color: activeSection === link.href
                      ? 'var(--accent-highlight)'
                      : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                  {/* Active indicator underline */}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full"
                      style={{ background: 'var(--accent-primary)' }}
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
                  ? 'neu-inset-sm'
                  : 'neu-btn'
              }`}
              style={{ color: isChatOpen ? 'var(--accent-highlight)' : 'var(--accent-secondary)' }}
              aria-label={isChatOpen ? 'Close chatbot' : 'Open chatbot'}
              title="AI Assistant"
            >
              <HiSparkles size={18} />
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="neu-btn flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden"
              style={{ color: 'var(--text-primary)' }}
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
            className="overflow-hidden lg:hidden"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            <div className="neu-raised px-4 pb-6 pt-4">
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
                      className="block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300"
                      style={{
                        color: activeSection === link.href ? 'var(--accent-highlight)' : 'var(--text-secondary)',
                        background: activeSection === link.href ? 'var(--bg-main)' : 'transparent',
                        boxShadow: activeSection === link.href ? 'var(--shadow-inset-sm)' : 'none',
                      }}
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
