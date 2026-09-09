import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes so a caller's `className` always wins over a
 *  component's defaults instead of both landing in the class list. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
