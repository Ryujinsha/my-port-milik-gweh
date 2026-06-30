import { motion } from 'framer-motion';

/**
 * Reusable button component with primary and secondary variants.
 */
export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
  icon,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-darker cursor-pointer';

  const variants = {
    primary:
      'bg-accent text-neutral-white hover:bg-accent-light hover:shadow-[0_0_30px_rgba(54,173,163,0.4)] active:scale-[0.97]',
    secondary:
      'border-2 border-accent/40 text-accent hover:border-accent hover:bg-accent/10 active:scale-[0.97]',
  };

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2, ease: 'easeOut' },
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClassName}
        {...motionProps}
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      {...motionProps}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
}
