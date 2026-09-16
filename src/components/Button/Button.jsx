import { motion } from 'framer-motion';

/**
 * Reusable neumorphic button component with primary and secondary variants.
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
    'inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none cursor-pointer';

  const variants = {
    primary:
      'neu-btn text-neutral-white hover:text-accent-light active:shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)]',
    secondary:
      'neu-flat text-neutral-gray hover:bg-card-hover hover:text-neutral-white active:shadow-[inset_2px_2px_4px_var(--neu-shadow-dark),inset_-2px_-2px_4px_var(--neu-shadow-light)]',
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
