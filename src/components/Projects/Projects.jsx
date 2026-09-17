import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { PROJECTS } from '../../utils/data';

/**
 * Individual project card — neumorphic raised with scroll-linked stacking.
 */
function ProjectCard({ project, index, progress, total }) {
  const positionInStack = useTransform(progress, (p) => {
    const current = p * total;
    return index - current;
  });

  const x = useTransform(positionInStack, [0, -1], ["0%", "150%"]);
  const rotate = useTransform(positionInStack, [0, -1], [0, 10]);
  const opacity = useTransform(positionInStack, [0, -0.8, -1], [1, 1, 0]);

  const scale = useTransform(
    positionInStack,
    [-1, 0, 1, 2, 3, 4, 5, 10],
    [1, 1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.5]
  );
  
  const y = useTransform(
    positionInStack,
    [-1, 0, 1, 2, 3, 4, 5, 10],
    [0, 0, 40, 80, 120, 160, 200, 400]
  );

  const zIndex = total - index;

  /* Grayscale versions of project colors */
  const grayTone = index % 2 === 0 ? 'rgba(192,192,200,' : 'rgba(154,154,164,';

  return (
    <motion.article
      style={{
        x,
        y,
        scale,
        rotate,
        opacity,
        zIndex,
      }}
      className="absolute top-0 left-0 right-0 mx-auto w-full max-w-2xl group overflow-hidden rounded-2xl neu-raised transition-all duration-500"
    >
      {/* Thumbnail area */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${grayTone}0.15), ${grayTone}0.05))`,
          }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="relative">
              <div
                className="h-16 w-16 rounded-2xl rotate-12 transition-transform duration-500 group-hover:rotate-[24deg]"
                style={{ backgroundColor: `${grayTone}0.2)` }}
              />
              <div
                className="absolute top-2 left-2 h-16 w-16 rounded-2xl -rotate-6 transition-transform duration-500 group-hover:-rotate-12"
                style={{
                  backgroundColor: `${grayTone}0.1)`,
                  border: `1px solid ${grayTone}0.3)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Hover overlay with links */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: 'rgba(42, 42, 46, 0.85)' }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn flex h-11 w-11 items-center justify-center rounded-full transition-all"
            style={{ color: 'var(--text-primary)' }}
            aria-label={`View ${project.title} source on GitHub`}
          >
            <FiGithub size={18} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn flex h-11 w-11 items-center justify-center rounded-full transition-all"
            style={{ color: 'var(--text-primary)' }}
            aria-label={`View ${project.title} live demo`}
          >
            <FiExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3
          className="mb-2 text-xl font-bold transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>
        <p
          className="mb-4 text-sm leading-relaxed line-clamp-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>

        {/* Tech stack tags — neumorphic pills */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="neu-pill"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Accent border highlight on hover — grayscale gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100"
        style={{
          background: 'linear-gradient(to right, var(--accent-secondary), var(--accent-highlight))',
        }}
      />
    </motion.article>
  );
}

/**
 * Projects section with a sticky scroll "stacked folder" animation — neumorphic.
 */
export default function Projects() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative"
      style={{ height: `${(PROJECTS.length + 1) * 75}vh` }}
    >
      {/* Sticky wrapper that stays in the viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
            style={{ backgroundColor: 'rgba(192, 192, 200, 0.03)' }}
          />
        </div>

        <Container className="flex h-full flex-col">
          <SectionTitle
            title="My Project Gw"
            subtitle="My Work"
          />

          {/* Container for the stacked cards */}
          <div className="relative flex-1 w-full mt-10">
            {PROJECTS.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                progress={scrollYProgress}
                total={PROJECTS.length}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
