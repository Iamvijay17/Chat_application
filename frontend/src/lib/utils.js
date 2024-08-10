import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import animationData from '@/assets/lottie-json';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const animationDefaultOption = {
  loop: true,
  autoplay:true,
  animationData:animationData,
};
