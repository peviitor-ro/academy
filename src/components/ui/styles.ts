/** Clase Tailwind comune, ca aspectul sa se schimbe dintr-un singur loc. */

export const cardClass =
  'rounded-2xl border border-beige-600 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5';

export const eyebrowClass =
  'font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-pastel-blue-500';

/** Titlu cu gradient, folosit in hero-uri. */
export const gradientTextClass =
  'bg-gradient-to-r from-blue-500 via-blue-300 to-blue-600 bg-clip-text text-transparent dark:from-pastel-blue-500 dark:via-blue-400 dark:to-blue-300';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'sm';

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md') {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition';
  const sizes = { md: 'px-6 py-3', sm: 'px-5 py-2.5 text-sm' }[size];
  const variants = {
    primary:
      'bg-blue-500 text-white hover:bg-blue-400',
    secondary:
      'border border-green-400/50 bg-beige-300 text-green-700 hover:border-green-500 dark:border-blue-500/40 dark:bg-dark-400 dark:text-blue-300 dark:hover:border-pastel-blue-500',
  }[variant];
  return `${base} ${sizes} ${variants}`;
}

export const chipClass =
  'rounded-full border border-blue-600/40 px-3 py-1 text-xs font-semibold text-blue-800 transition hover:border-blue-500 hover:bg-blue-500/10 dark:border-pastel-blue-500/40 dark:text-pastel-blue-400';
