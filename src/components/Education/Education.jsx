import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiCalendar, HiStar } from 'react-icons/hi';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { EDUCATION } from '../../utils/data';
import { fadeUp, staggerContainer } from '../../utils/animations';

/**
 * Education card with neumorphic styling and timeline indicator.
 */
function EducationCard({ item, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative"
    >
      {/* Timeline connector line */}
      <div
        className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
        style={{ backgroundColor: 'var(--border-color)' }}
      />

      <div className="relative flex gap-4 md:gap-6">
        {/* Timeline dot — neumorphic */}
        <div
          className="relative z-10 hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl neu-btn transition-all duration-300"
        >
          <HiAcademicCap className="text-lg" style={{ color: 'var(--accent-primary)' }} />
        </div>

        {/* Card Content — neumorphic raised */}
        <div
          className="flex-1 rounded-2xl p-6 neu-raised transition-all duration-500"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-raised-lg)';
            e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-raised)';
            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
          }}
        >
          {/* Degree badge — neumorphic pill */}
          {item.degree && (
            <span className="neu-pill mb-3">
              <HiStar className="text-xs" />
              {item.degree}
            </span>
          )}

          {/* Institution */}
          <h3
            className="mb-1 text-xl font-bold transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            {item.institution}
          </h3>

          {/* Major */}
          {item.major && (
            <p
              className="mb-2 text-base font-medium"
              style={{ color: 'var(--accent-primary)' }}
            >
              {item.major}
            </p>
          )}

          {/* Year */}
          {item.year && (
            <div
              className="mb-3 flex items-center gap-1.5 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <HiCalendar className="text-sm" />
              <span>{item.year}</span>
            </div>
          )}

          {/* Description */}
          {item.description && (
            <p
              className="mb-3 text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.description}
            </p>
          )}

          {/* GPA badge — neumorphic pill */}
          {item.gpa && (
            <span className="neu-pill">
              <span>IPK:</span>
              <span className="font-semibold">{item.gpa}</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Education section — "Pendidikan Terakhir" with neumorphic timeline cards.
 */
export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (EDUCATION.length === 0) return null;

  return (
    <section id="education" className="relative py-20 lg:py-28">
      {/* Background decoration — grayscale */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full blur-[150px]"
          style={{ backgroundColor: 'rgba(154, 154, 164, 0.04)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(192, 192, 200, 0.03)' }}
        />
      </div>

      <Container>
        <SectionTitle
          title="Pendidikan Terakhir"
          subtitle="Education"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-3xl space-y-6"
        >
          {EDUCATION.map((item, index) => (
            <EducationCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
