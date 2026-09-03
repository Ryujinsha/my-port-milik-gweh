import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiCalendar, HiStar } from 'react-icons/hi';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { EDUCATION } from '../../utils/data';
import { fadeUp, staggerContainer } from '../../utils/animations';

/**
 * Education card with timeline indicator and hover glow.
 */
function EducationCard({ item, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative"
    >
      {/* Timeline connector line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" style={{ backgroundColor: 'var(--border-color)' }} />

      <div className="relative flex gap-4 md:gap-6">
        {/* Timeline dot */}
        <div className="relative z-10 hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-card transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(61,164,158,0.3)]"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <HiAcademicCap className="text-accent text-lg" style={{ color: 'var(--accent-teal)' }} />
        </div>

        {/* Card Content */}
        <div
          className="flex-1 rounded-2xl border p-6 transition-all duration-500 hover:shadow-lg"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
            e.currentTarget.style.borderColor = 'var(--accent-teal)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(61, 164, 158, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Degree badge */}
          {item.degree && (
            <span
              className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: 'rgba(61, 164, 158, 0.1)',
                color: 'var(--accent-teal)',
                border: '1px solid rgba(61, 164, 158, 0.2)',
              }}
            >
              <HiStar className="text-xs" />
              {item.degree}
            </span>
          )}

          {/* Institution */}
          <h3
            className="mb-1 text-xl font-bold transition-colors duration-300 group-hover:text-accent"
            style={{ color: 'var(--text-primary)' }}
          >
            {item.institution}
          </h3>

          {/* Major */}
          {item.major && (
            <p
              className="mb-2 text-base font-medium"
              style={{ color: 'var(--accent-blue)' }}
            >
              {item.major}
            </p>
          )}

          {/* Year */}
          {item.year && (
            <div className="mb-3 flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <HiCalendar className="text-sm" />
              <span>{item.year}</span>
            </div>
          )}

          {/* Description */}
          {item.description && (
            <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {item.description}
            </p>
          )}

          {/* GPA badge */}
          {item.gpa && (
            <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: 'rgba(243, 168, 189, 0.1)',
                color: 'var(--accent-pink)',
                border: '1px solid rgba(243, 168, 189, 0.2)',
              }}
            >
              <span>IPK:</span>
              <span>{item.gpa}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Education section — "Pendidikan Terakhir" with timeline cards.
 */
export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (EDUCATION.length === 0) return null;

  return (
    <section id="education" className="relative py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full blur-[150px]"
          style={{ backgroundColor: 'rgba(137, 163, 224, 0.08)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(243, 168, 189, 0.06)' }}
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
