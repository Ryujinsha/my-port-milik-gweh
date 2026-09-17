import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiHeart } from 'react-icons/fi';
import Container from '../Container/Container';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/data';
import { fadeUp } from '../../utils/animations';
import { useInView } from 'react-intersection-observer';

const ICON_MAP = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  email: FiMail,
};

/**
 * Footer with neumorphic logo, copyright, tech stack, and social links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer
      className="relative"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      {/* Gradient fade from content */}
      <div
        className="absolute -top-px left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(192, 192, 200, 0.1), transparent)',
        }}
      />

      <Container>
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="py-12 lg:py-16"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo — neumorphic */}
            <a
              href="#hero"
              className="group flex items-center gap-2 text-xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="neu-btn flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold transition-all duration-300"
                style={{ color: 'var(--accent-highlight)' }}
              >
                {PERSONAL_INFO.firstName[0]}
              </span>
              <span>
                {PERSONAL_INFO.firstName}
                <span style={{ color: 'var(--accent-primary)' }}>.</span>
              </span>
            </a>

            {/* Social Links — neumorphic mini buttons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== 'email' ? '_blank' : undefined}
                    rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
                    className="neu-btn flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            {/* Tech Stack */}
            <p
              className="flex items-center gap-1.5 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              Built with{' '}
              <FiHeart size={14} style={{ color: 'var(--accent-primary)' }} />{' '}
              using
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                React
              </span>
              +
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                Tailwind CSS
              </span>
            </p>

            {/* Copyright */}
            <p className="text-xs" style={{ color: 'var(--accent-muted)' }}>
              &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
