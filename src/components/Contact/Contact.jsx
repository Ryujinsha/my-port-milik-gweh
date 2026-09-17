import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import Button from '../Button/Button';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/data';
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '../../utils/animations';

const ICON_MAP = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  email: FiMail,
};

const FORM_STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * Contact section with neumorphic form + social links.
 */
export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(FORM_STATUS.IDLE);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(FORM_STATUS.SENDING);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );
      setStatus(FORM_STATUS.SUCCESS);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(FORM_STATUS.IDLE), 4000);
    } catch {
      setStatus(FORM_STATUS.ERROR);
      setTimeout(() => setStatus(FORM_STATUS.IDLE), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28">
      {/* Background — grayscale glow */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(192, 192, 200, 0.03)' }}
        />
        <div
          className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(154, 154, 164, 0.04)' }}
        />
      </div>

      <Container>
        <SectionTitle
          title="Let's Get In Touch"
          subtitle="Contact"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left — Info */}
          <motion.div variants={slideInLeft} className="flex flex-col justify-center">
            <h3
              className="mb-4 text-2xl font-bold sm:text-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Let&apos;s work{' '}
              <span className="gradient-text">together</span>
            </h3>
            <p
              className="mb-8 max-w-md text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Have a project in mind or just want to say hi? Feel free to reach
              out. I&apos;m always open to discussing new opportunities and
              creative ideas.
            </p>

            {/* Social Links — neumorphic raised circles */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== 'email' ? '_blank' : undefined}
                    rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="neu-btn flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300"
                    style={{ color: 'var(--accent-primary)' }}
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Form — neumorphic raised card */}
          <motion.div variants={slideInRight}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="neu-raised space-y-5 rounded-2xl p-6 sm:p-8"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="neu-input w-full rounded-xl px-4 py-3.5 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="neu-input w-full rounded-xl px-4 py-3.5 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="neu-input w-full rounded-xl px-4 py-3.5 text-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                icon={
                  status === FORM_STATUS.SENDING ? (
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-t-white"
                      style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }}
                    />
                  ) : status === FORM_STATUS.SUCCESS ? (
                    <FiCheck />
                  ) : status === FORM_STATUS.ERROR ? (
                    <FiAlertCircle />
                  ) : (
                    <FiSend />
                  )
                }
              >
                {status === FORM_STATUS.SENDING
                  ? 'Sending...'
                  : status === FORM_STATUS.SUCCESS
                    ? 'Message Sent!'
                    : status === FORM_STATUS.ERROR
                      ? 'Failed. Try Again'
                      : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
