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

/**
 * Individual skill category card — neumorphic raised.
 */
function SkillCategoryCard({ category, index }) {
  const Icon = ICON_MAP[category.icon] || HiChip;

  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-2xl p-6 neu-raised transition-all duration-500"
      whileHover={{
        y: -4,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-raised-lg)';
        e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-raised)';
        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
      }}
    >
      {/* Category Icon — neumorphic inset circle */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl neu-inset-sm transition-all duration-300"
      >
        <Icon className="text-xl" style={{ color: 'var(--accent-primary)' }} />
      </div>

      {/* Category Title */}
      <h3
        className="mb-4 text-lg font-bold"
        style={{ color: 'var(--text-primary)' }}
      >
        {category.category}
      </h3>

      {/* Skill Tags — neumorphic inset pills */}
      <div className="flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <span
            key={skill}
            className="neu-pill transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Skills section — categorized grid of tech skills with neumorphic styling.
 */
export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (SKILLS.length === 0) return null;

  return (
    <section id="skills" className="relative py-20 lg:py-28">
      {/* Background decoration — grayscale */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
          style={{ backgroundColor: 'rgba(192, 192, 200, 0.03)' }}
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
