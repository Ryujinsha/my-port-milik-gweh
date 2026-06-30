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
 * Footer with logo, copyright, tech stack, and social links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient fade from content */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <Container>
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="py-12 lg:py-16"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <a href="#hero" className="group flex items-center gap-2 text-xl font-bold text-neutral-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-extrabold text-neutral-white transition-all duration-300 group-hover:glow-accent">
                {PERSONAL_INFO.firstName[0]}
              </span>
              <span>
                {PERSONAL_INFO.firstName}
                <span className="text-accent">.</span>
              </span>
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== 'email' ? '_blank' : undefined}
                    rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-gray transition-all duration-300 hover:bg-white/5 hover:text-accent"
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            {/* Tech Stack */}
            <p className="flex items-center gap-1.5 text-sm text-neutral-gray">
              Built with <FiHeart className="text-accent" size={14} /> using
              <span className="font-medium text-neutral-white">React</span>+
              <span className="font-medium text-neutral-white">Tailwind CSS</span>
            </p>

            {/* Copyright */}
            <p className="text-xs text-neutral-gray/60">
              &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
