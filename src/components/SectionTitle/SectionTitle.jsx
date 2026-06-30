import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeUp } from '../../utils/animations';

/**
 * Consistent section heading with accent underline animation.
 */
export default function SectionTitle({ title, subtitle, className = '' }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`mb-12 text-center md:mb-16 ${className}`}
    >
      {subtitle && (
        <span className="mb-3 inline-block text-sm font-medium tracking-widest text-accent uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl font-bold text-neutral-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
    </motion.div>
  );
}
