import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiX, HiEye } from 'react-icons/hi';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import { DESIGNS } from '../../utils/data';
import { fadeUp, staggerContainer } from '../../utils/animations';

/**
 * Individual design card — neumorphic raised with hover preview.
 */
function DesignCard({ design, onClick }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group cursor-pointer"
      onClick={() => onClick(design)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="neu-raised rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[10px_10px_20px_var(--neu-shadow-dark),-10px_-10px_20px_var(--neu-shadow-light)]">
        {/* Image Area */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {design.image ? (
            <img
              src={design.image}
              alt={design.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            /* Placeholder when no image is provided */
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, rgba(${design.placeholderSeed || '160,160,170'},0.15), rgba(${design.placeholderSeed || '120,120,130'},0.08))`,
              }}
            >
              <div className="text-center px-4">
                <div
                  className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl neu-inset-sm"
                >
                  <svg
                    className="h-8 w-8"
                    style={{ color: 'var(--accent-secondary)' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                </div>
                <p
                  className="text-xs font-medium"
                  style={{ color: 'var(--accent-muted)' }}
                >
                  Tambahkan gambar
                </p>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: 'rgba(42, 42, 46, 0.7)', backdropFilter: 'blur(4px)' }}
          >
            <div
              className="neu-btn flex h-12 w-12 items-center justify-center rounded-full"
              style={{ color: 'var(--accent-highlight)' }}
            >
              <HiEye size={22} />
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="p-4">
          <h3
            className="mb-1 text-sm font-bold truncate"
            style={{ color: 'var(--text-primary)' }}
          >
            {design.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="neu-pill text-[0.65rem]">
              {design.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Lightbox modal for viewing design in full size.
 */
function Lightbox({ design, onClose }) {
  if (!design) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(20, 20, 24, 0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="neu-btn fixed top-6 right-6 z-[90] flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ color: 'var(--text-primary)' }}
        aria-label="Close lightbox"
      >
        <HiX size={20} />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="max-h-[85vh] max-w-4xl w-full neu-raised-lg rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {design.image ? (
          <img
            src={design.image}
            alt={design.title}
            className="h-full w-full object-contain"
            style={{ maxHeight: '70vh' }}
          />
        ) : (
          <div
            className="flex h-64 items-center justify-center"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>Belum ada gambar</p>
          </div>
        )}

        {/* Info bar */}
        <div
          className="px-6 py-4"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {design.title}
              </h3>
              {design.description && (
                <p
                  className="mt-1 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {design.description}
                </p>
              )}
            </div>
            <span className="neu-pill shrink-0">
              {design.category}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Design Gallery section — masonry-ish grid with neumorphic cards and lightbox.
 */
export default function DesignGallery() {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!DESIGNS || DESIGNS.length === 0) return null;

  const categories = ['All', ...new Set(DESIGNS.map((d) => d.category))];
  const filteredDesigns =
    activeCategory === 'All'
      ? DESIGNS
      : DESIGNS.filter((d) => d.category === activeCategory);

  return (
    <section id="designs" className="relative py-20 lg:py-28">
      {/* Background decoration — grayscale */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full blur-[150px]"
          style={{ backgroundColor: 'rgba(192, 192, 200, 0.03)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 h-64 w-64 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(154, 154, 164, 0.04)' }}
        />
      </div>

      <Container>
        <SectionTitle
          title="Design Gallery"
          subtitle="Creative Works"
        />

        {/* Category Filter — neumorphic pills */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat ? 'neu-inset-sm' : 'neu-btn'
              }`}
              style={{
                color: activeCategory === cat ? 'var(--accent-highlight)' : 'var(--text-secondary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto grid max-w-6xl gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredDesigns.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
                onClick={setSelectedDesign}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredDesigns.length === 0 && (
          <div className="mt-12 text-center">
            <p style={{ color: 'var(--text-secondary)' }}>
              Belum ada desain dalam kategori ini.
            </p>
          </div>
        )}
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedDesign && (
          <Lightbox
            design={selectedDesign}
            onClose={() => setSelectedDesign(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
