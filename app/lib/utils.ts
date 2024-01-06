import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useDebouncedCallback(callback: Function, wait: number) {
  let id: any = 0;
  return (...args: any) => {
    clearTimeout(id);
    id = setTimeout(() => callback(...args), wait);
  };
}
