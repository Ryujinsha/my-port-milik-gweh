import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import Container from '../Container/Container';
import Button from '../Button/Button';
import { PERSONAL_INFO } from '../../utils/data';
import { fadeUp, staggerContainer, floatingAnimation } from '../../utils/animations';

/* Titles to cycle through in the typing effect */
const TITLES = ['Frontend Developer', 'UI/UX Enthusiast', 'Tech Entusiast', 'Web Developer'];

const WELCOME_GREETINGS = [
  "Welcome", // English
  "Selamat datang", // Indonesian
  "ようこそ", // Japanese
  "Willkommen", // German
  "欢迎", // Chinese
];

/**
 * Hero section with typing effect, stagger animations, and floating illustration.
 * Neumorphism grayscale theme.
 */
export default function Hero({ scrollTo }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();
  
  // Scroll animation phases
  const textOpacity = useTransform(scrollY, [0, 600, 800, 1200], [0, 1, 1, 0]);
  const textY = useTransform(scrollY, [0, 600], [30, 0]);
  const textX = useTransform(scrollY, [0, 600, 800, 1200], ["0vw", "0vw", "0vw", isDesktop ? "-50vw" : "-100vw"]);
  
  const avatarX = useTransform(scrollY, [0, 600, 800, 1200], [isDesktop ? "-40vw" : "0vw", "0vw", "0vw", isDesktop ? "50vw" : "100vw"]);
  const avatarOpacity = useTransform(scrollY, [0, 600, 800, 1200], [1, 1, 1, 0]);
  
  const welcomeOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const welcomePointerEvents = useTransform(scrollY, [0, 100], ["auto", "none"]);

  const [welcomeIndex, setWelcomeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % WELCOME_GREETINGS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  /* Typing effect */
  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timeout;

    if (!isDeleting && displayedText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayedText(
            isDeleting
              ? currentTitle.substring(0, displayedText.length - 1)
              : currentTitle.substring(0, displayedText.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  const handleCTA = (e, target) => {
    e.preventDefault();
    if (scrollTo) {
      scrollTo(target);
    }
  };

  return (
    <section
      id="hero"
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 w-full flex h-screen items-center overflow-hidden pt-20">
      {/* Background — subtle grayscale gradients */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(192, 192, 200, 0.04)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(154, 154, 164, 0.06)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(192, 192, 200, 0.1), transparent)' }}
        />
      </div>

      <Container>
        <div className="grid min-h-[calc(100vh-5rem)] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text Content */}
          <motion.div
            style={{ opacity: textOpacity, y: textY, x: textX }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            {/* Greeting badge — neumorphic inset pill */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="neu-pill">
                <span
                  className="inline-block h-2 w-2 animate-pulse rounded-full"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                />
                Available for work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {PERSONAL_INFO.greeting}{' '}
              <span className="gradient-text">{PERSONAL_INFO.name}</span>
            </motion.h1>

            {/* Typing Effect Title */}
            <motion.div variants={fadeUp} className="mb-6 h-10">
              <p
                className="text-xl font-medium sm:text-2xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                {displayedText}
                <span
                  className="ml-0.5 inline-block w-[3px] animate-pulse text-transparent"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                >
                  |
                </span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-8 max-w-lg text-base leading-relaxed lg:mx-0 lg:text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              {PERSONAL_INFO.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                variant="primary"
                href="#projects"
                onClick={(e) => handleCTA(e, '#projects')}
                icon={<HiArrowDown className="animate-bounce" />}
              >
                View Projects
              </Button>
              <Button
                variant="secondary"
                href="#contact"
                onClick={(e) => handleCTA(e, '#contact')}
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — Floating Illustration / Avatar & Welcome Text */}
          <div className="order-1 flex items-center justify-center lg:order-2 relative w-full h-full min-h-[300px]">
            {/* Welcome Text Overlay */}
            <motion.div
              style={{ opacity: welcomeOpacity, pointerEvents: welcomePointerEvents }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
            >
              <div className="h-20 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={welcomeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {WELCOME_GREETINGS[welcomeIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <p
                className="mt-4 text-lg sm:text-xl animate-pulse"
                style={{ color: 'var(--text-secondary)' }}
              >
                Let's see beneath this
              </p>
            </motion.div>

            <motion.div
              style={{ x: avatarX, opacity: avatarOpacity }}
              className="relative z-20"
            >
              {/* Glow ring — grayscale */}
              <div
                className="absolute inset-0 -m-6 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(192,192,200,0.08) 0%, rgba(154,154,164,0.04) 50%, transparent 70%)',
                }}
              />

              {/* Floating character */}
              <motion.div
                animate={floatingAnimation}
                className="relative"
              >
                {/* Circle background frame — neumorphic */}
                <div
                  className="relative h-64 w-64 overflow-hidden rounded-full sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                  style={{
                    boxShadow: 'var(--shadow-raised-lg)',
                    border: '2px solid rgba(192, 192, 200, 0.1)',
                  }}
                >
                  {/* Gradient circle background — grayscale */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #353540, #2a2a30, #303038)',
                    }}
                  />
                </div>

                {/* Character image — positioned over the circle, extending upward */}
                <div className="absolute inset-0 flex items-end justify-center overflow-visible">
                  <div className="relative w-[110%] sm:w-[105%]" style={{ marginBottom: '-8%' }}>
                    <img
                      src="/MBG.png"
                      alt="Character"
                      className="w-full h-auto object-contain"
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(192, 192, 200, 0.15))',
                        maskImage: 'linear-gradient(to bottom, black 55%, transparent 98%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 98%)',
                      }}
                    />
                  </div>
                </div>

                {/* Decorative orbiting dots — grayscale */}
                <div
                  className="absolute -right-3 top-8 h-4 w-4 rounded-full"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    boxShadow: '0 0 12px rgba(192, 192, 200, 0.4)',
                  }}
                />
                <div
                  className="absolute -left-2 bottom-12 h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: 'var(--accent-secondary)',
                    boxShadow: '0 0 10px rgba(154, 154, 164, 0.4)',
                  }}
                />
                <div
                  className="absolute -bottom-2 right-12 h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--accent-muted)',
                    boxShadow: '0 0 8px rgba(110, 110, 120, 0.4)',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
      </div>
    </section>
  );
}
