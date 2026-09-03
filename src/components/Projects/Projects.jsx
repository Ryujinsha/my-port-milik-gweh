import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { PROJECTS } from '../../utils/data';

/**
 * Individual project card with hover effects and scroll-linked animations.
 */
function ProjectCard({ project, index, progress, total }) {
  // calculate the position of the card in the stack
  // when positionInStack is 0, it is at the front
  // when positionInStack < 0, it has been scrolled past and slides right
  // when positionInStack > 0, it is deeper in the stack
  const positionInStack = useTransform(progress, (p) => {
    const current = p * total;
    return index - current;
  });

  // Slide right when exiting (position goes from 0 to -1)
  const x = useTransform(positionInStack, [0, -1], ["0%", "150%"]);
  // Optional slight rotate when sliding out
  const rotate = useTransform(positionInStack, [0, -1], [0, 10]);
  // Fade out when fully slid out
  const opacity = useTransform(positionInStack, [0, -0.8, -1], [1, 1, 0]);

  // Scale down and push down deeper cards
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
      className="absolute top-0 left-0 right-0 mx-auto w-full max-w-2xl group overflow-hidden rounded-2xl border border-white/10 bg-neutral-darker/90 backdrop-blur-md shadow-2xl transition-colors duration-500 hover:border-accent/50"
    >
      {/* Thumbnail area */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${project.color}33, ${project.color}11)`,
          }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="relative">
              <div
                className="h-16 w-16 rounded-2xl rotate-12 transition-transform duration-500 group-hover:rotate-[24deg]"
                style={{ backgroundColor: `${project.color}44` }}
              />
              <div
                className="absolute top-2 left-2 h-16 w-16 rounded-2xl -rotate-6 transition-transform duration-500 group-hover:-rotate-12"
                style={{ backgroundColor: `${project.color}22`, border: `1px solid ${project.color}66` }}
              />
            </div>
          </div>
        </div>

        {/* Hover overlay with links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-primary/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-neutral-white transition-all hover:bg-accent hover:border-accent"
            aria-label={`View ${project.title} source on GitHub`}
          >
            <FiGithub size={18} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-neutral-white transition-all hover:bg-accent hover:border-accent"
            aria-label={`View ${project.title} live demo`}
          >
            <FiExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-neutral-white transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-neutral-gray line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-gray transition-colors group-hover:border-accent/30 group-hover:text-accent/90"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Accent border highlight on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 bg-gradient-to-r from-accent to-accent-light transition-transform duration-500 origin-left group-hover:scale-x-100" />
    </motion.article>
  );
}

/**
 * Projects section with a sticky scroll "stacked folder" animation.
 */
export default function Projects() {
  const containerRef = useRef(null);
  
  // Track the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative"
      // The height determines how long the sticky effect lasts
      style={{ height: `${(PROJECTS.length + 1) * 75}vh` }}
    >
      {/* Sticky wrapper that stays in the viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface/5 blur-[150px]" />
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
