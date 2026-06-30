import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { PROJECTS } from '../../utils/data';
import { fadeUp, staggerContainer } from '../../utils/animations';

/**
 * Individual project card with hover effects.
 */
function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-darker/80 transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
    >
      {/* Thumbnail area */}
      <div className="relative h-48 overflow-hidden sm:h-52">
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
        <h3 className="mb-2 text-lg font-bold text-neutral-white transition-colors group-hover:text-accent">
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
              className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-gray transition-colors group-hover:border-accent/20 group-hover:text-accent/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Accent border highlight on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r from-accent to-accent-light transition-transform duration-500 origin-left group-hover:scale-x-100" />
    </motion.article>
  );
}

/**
 * Projects section with responsive grid of project cards.
 */
export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section id="projects" className="relative py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface/5 blur-[150px]" />
      </div>

      <Container>
        <SectionTitle
          title="Featured Projects"
          subtitle="My Work"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
