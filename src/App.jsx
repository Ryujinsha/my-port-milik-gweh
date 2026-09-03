import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Education from './components/Education/Education';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import { useLenis } from './hooks/useLenis';
import { useState } from 'react';

/**
 * Main App component — assembles all sections with Lenis smooth scroll.
 */
export default function App() {
  const { scrollTo } = useLenis();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Header 
        scrollTo={scrollTo} 
        onChatToggle={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
      />
      <main>
        <Hero scrollTo={scrollTo} />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
