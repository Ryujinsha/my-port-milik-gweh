import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import Container from '../Container/Container';
import Button from '../Button/Button';
import { PERSONAL_INFO } from '../../utils/data';
import { fadeUp, floatingAnimation } from '../../utils/animations';

const TITLES = ['Frontend Developer', 'UI/UX Enthusiast', 'Tech Entusiast', 'Web Developer'];
const WELCOME_GREETINGS = ["Welcome", "Selamat datang", "ようこそ", "Willkommen", "欢迎"];

export default function Hero({ scrollTo }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check(); // Initial check
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isDesktop ? <DesktopHero scrollTo={scrollTo} /> : <MobileHero scrollTo={scrollTo} />;
}

/**
 * Mobile Hero - Uses state transitions instead of scroll to reduce performance load
 * and keeps everything fit to center without scrolling.
 */
function MobileHero({ scrollTo }) {
  const [phase, setPhase] = useState('welcome'); // 'welcome' | 'intro'
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Welcome screen timer & interval
  useEffect(() => {
    if (phase === 'welcome') {
      const interval = setInterval(() => {
        setWelcomeIndex((prev) => (prev + 1) % WELCOME_GREETINGS.length);
      }, 1500);
      
      const timeout = setTimeout(() => setPhase('intro'), 4500); // Auto transition after 4.5s

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [phase]);

  // Typing effect
  useEffect(() => {
    if (phase !== 'intro') return; // Only type when in intro phase

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
  }, [displayedText, isDeleting, titleIndex, phase]);

  const handleCTA = (e, target) => {
    e.preventDefault();
    if (scrollTo) scrollTo(target);
  };

  return (
    <section id="hero" className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden pt-16">
      {/* Background — subtle grayscale gradients */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(192, 192, 200, 0.04)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(154, 154, 164, 0.06)' }}
        />
      </div>

      <Container className="flex h-full flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'welcome' ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="flex w-full cursor-pointer flex-col items-center justify-center text-center"
              onClick={() => setPhase('intro')}
            >
              {/* Avatar for Welcome Screen */}
              <div className="relative mb-10">
                <div className="absolute inset-0 -m-4 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(192,192,200,0.08) 0%, transparent 70%)' }} />
                <motion.div animate={floatingAnimation} className="relative">
                  <div className="relative h-56 w-56 overflow-hidden rounded-full" style={{ boxShadow: 'var(--shadow-raised-lg)', border: '2px solid rgba(192, 192, 200, 0.1)' }}>
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #353540, #2a2a30, #303038)' }} />
                  </div>
                  <div className="absolute inset-0 flex items-end justify-center overflow-visible">
                    <div className="relative w-[110%]" style={{ marginBottom: '-8%' }}>
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
                </motion.div>
              </div>

              {/* Welcome Text */}
              <div className="flex h-16 items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={welcomeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl font-bold sm:text-5xl"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {WELCOME_GREETINGS[welcomeIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <p className="mt-3 animate-pulse text-sm" style={{ color: 'var(--text-secondary)' }}>
                Tap to view profile
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="flex w-full flex-col items-center justify-center text-center"
            >
              <motion.div variants={fadeUp} className="mb-5">
                <span className="neu-pill">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
                  Available for work
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mb-3 text-3xl font-extrabold leading-tight sm:text-4xl"
                style={{ color: 'var(--text-primary)' }}
              >
                {PERSONAL_INFO.greeting}{' '}
                <span className="gradient-text block">{PERSONAL_INFO.name}</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="mb-6 h-8">
                <p className="text-base font-medium sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
                  {displayedText}
                  <span className="ml-0.5 inline-block w-[3px] animate-pulse text-transparent" style={{ backgroundColor: 'var(--accent-primary)' }}>|</span>
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mx-auto mb-8 w-full max-w-[280px] text-sm leading-relaxed sm:max-w-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {PERSONAL_INFO.description}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 sm:flex-row">
                <Button variant="primary" href="#projects" onClick={(e) => handleCTA(e, '#projects')} icon={<HiArrowDown className="animate-bounce" />}>
                  View Projects
                </Button>
                <Button variant="secondary" href="#contact" onClick={(e) => handleCTA(e, '#contact')}>
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}

/**
 * Desktop Hero - Original scroll-based layout
 */
function DesktopHero({ scrollTo }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  const { scrollY } = useScroll();
  
  const textOpacity = useTransform(scrollY, [0, 600, 800, 1200], [0, 1, 1, 0]);
  const textY = useTransform(scrollY, [0, 600], [30, 0]);
  const textX = useTransform(scrollY, [0, 600, 800, 1200], ["0vw", "0vw", "0vw", "-50vw"]);
  
  const avatarX = useTransform(scrollY, [0, 600, 800, 1200], ["-40vw", "0vw", "0vw", "50vw"]);
  const avatarOpacity = useTransform(scrollY, [0, 600, 800, 1200], [1, 1, 1, 0]);
  
  const welcomeOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const welcomePointerEvents = useTransform(scrollY, [0, 100], ["auto", "none"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % WELCOME_GREETINGS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
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
    if (scrollTo) scrollTo(target);
  };

  return (
    <section id="hero" className="relative h-[200vh]">
      <div className="sticky top-0 w-full flex h-[100dvh] items-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(192, 192, 200, 0.04)' }} />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(154, 154, 164, 0.06)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(192, 192, 200, 0.1), transparent)' }} />
        </div>

        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2" style={{ minHeight: 'calc(100dvh - 6rem)' }}>
            <motion.div style={{ opacity: textOpacity, y: textY, x: textX }} className="text-left">
              <motion.div variants={fadeUp} className="mb-6">
                <span className="neu-pill">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
                  Available for work
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="mb-4 text-6xl xl:text-7xl font-extrabold leading-tight" style={{ color: 'var(--text-primary)' }}>
                {PERSONAL_INFO.greeting}{' '}
                <span className="gradient-text block">{PERSONAL_INFO.name}</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="mb-6 h-10">
                <p className="text-2xl font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {displayedText}
                  <span className="ml-0.5 inline-block w-[3px] animate-pulse text-transparent" style={{ backgroundColor: 'var(--accent-primary)' }}>|</span>
                </p>
              </motion.div>

              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {PERSONAL_INFO.description}
              </motion.p>

              <motion.div variants={fadeUp} className="flex justify-start gap-4">
                <Button variant="primary" href="#projects" onClick={(e) => handleCTA(e, '#projects')} icon={<HiArrowDown className="animate-bounce" />}>
                  View Projects
                </Button>
                <Button variant="secondary" href="#contact" onClick={(e) => handleCTA(e, '#contact')}>
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>

            <div className="relative w-full min-h-[300px] flex items-center justify-center">
              <motion.div style={{ opacity: welcomeOpacity, pointerEvents: welcomePointerEvents }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                <div className="h-20 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h2 key={welcomeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {WELCOME_GREETINGS[welcomeIndex]}
                    </motion.h2>
                  </AnimatePresence>
                </div>
                <p className="mt-4 text-xl animate-pulse" style={{ color: 'var(--text-secondary)' }}>
                  Let's see beneath this
                </p>
              </motion.div>

              <motion.div style={{ x: avatarX, opacity: avatarOpacity }} className="relative z-20">
                <div className="absolute inset-0 -m-6 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(192,192,200,0.08) 0%, rgba(154,154,164,0.04) 50%, transparent 70%)' }} />
                <motion.div animate={floatingAnimation} className="relative">
                  <div className="relative h-96 w-96 overflow-hidden rounded-full" style={{ boxShadow: 'var(--shadow-raised-lg)', border: '2px solid rgba(192, 192, 200, 0.1)' }}>
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #353540, #2a2a30, #303038)' }} />
                  </div>
                  <div className="absolute inset-0 flex items-end justify-center overflow-visible">
                    <div className="relative w-[105%]" style={{ marginBottom: '-8%' }}>
                      <img src="/MBG.png" alt="Character" className="w-full h-auto object-contain" style={{ filter: 'drop-shadow(0 0 30px rgba(192, 192, 200, 0.15))', maskImage: 'linear-gradient(to bottom, black 55%, transparent 98%)', WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 98%)' }} />
                    </div>
                  </div>
                  <div className="absolute -right-3 top-8 h-4 w-4 rounded-full" style={{ backgroundColor: 'var(--accent-primary)', boxShadow: '0 0 12px rgba(192, 192, 200, 0.4)' }} />
                  <div className="absolute -left-2 bottom-12 h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--accent-secondary)', boxShadow: '0 0 10px rgba(154, 154, 164, 0.4)' }} />
                  <div className="absolute -bottom-2 right-12 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--accent-muted)', boxShadow: '0 0 8px rgba(110, 110, 120, 0.4)' }} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
