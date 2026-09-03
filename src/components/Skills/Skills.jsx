import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiCode, HiServer, HiCog, HiDatabase, HiGlobe, HiDesktopComputer, HiLightningBolt, HiChip } from 'react-icons/hi';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { SKILLS } from '../../utils/data';
import { fadeUp, staggerContainer } from '../../utils/animations';

/* Map icon string from .env to React Icon component */
const ICON_MAP = {
  frontend: HiCode,
  backend: HiServer,
  tools: HiCog,
  database: HiDatabase,
  web: HiGlobe,
  desktop: HiDesktopComputer,
  performance: HiLightningBolt,
  code: HiChip,
};

/* Accent color rotation for category cards */
const ACCENT_COLORS = [
  { bg: 'rgba(61, 164, 158, 0.1)', border: 'rgba(61, 164, 158, 0.25)', text: 'var(--accent-teal)', glow: 'rgba(61, 164, 158, 0.3)' },
  { bg: 'rgba(137, 163, 224, 0.1)', border: 'rgba(137, 163, 224, 0.25)', text: 'var(--accent-blue)', glow: 'rgba(137, 163, 224, 0.3)' },
  { bg: 'rgba(243, 168, 189, 0.1)', border: 'rgba(243, 168, 189, 0.25)', text: 'var(--accent-pink)', glow: 'rgba(243, 168, 189, 0.3)' },
  { bg: 'rgba(61, 164, 158, 0.08)', border: 'rgba(61, 164, 158, 0.2)', text: 'var(--accent-teal)', glow: 'rgba(61, 164, 158, 0.25)' },
];

/**
 * Individual skill category card.
 */
function SkillCategoryCard({ category, index }) {
  const colors = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const Icon = ICON_MAP[category.icon] || HiChip;

  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-2xl border p-6 transition-all duration-500"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.boxShadow = `0 0 30px ${colors.glow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Category Icon */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300"
        style={{
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
        }}
      >
        <Icon className="text-xl" style={{ color: colors.text }} />
      </div>

      {/* Category Title */}
      <h3
        className="mb-4 text-lg font-bold"
        style={{ color: 'var(--text-primary)' }}
      >
        {category.category}
      </h3>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <span
            key={skill}
            className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Skills section — categorized grid of tech skills.
 */
export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (SKILLS.length === 0) return null;

  return (
    <section id="skills" className="relative py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
          style={{ backgroundColor: 'rgba(61, 164, 158, 0.06)' }}
        />
      </div>

      <Container>
        <SectionTitle
          title="Skills & Tools"
          subtitle="What I Use"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {SKILLS.map((category, index) => (
            <SkillCategoryCard key={category.id} category={category} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
