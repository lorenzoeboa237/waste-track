import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine des classes avec clsx et fusionne les classes Tailwind avec tailwind-merge.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
