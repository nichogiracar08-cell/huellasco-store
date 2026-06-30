import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: string, currency = 'COP'): string {
  const num = Math.round(parseFloat(amount));
  if (currency === 'COP') {
    return '$' + num.toLocaleString('es-CO');
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function getDiscountPercentage(price: string, compareAt: string): number {
  const p = parseFloat(price);
  const c = parseFloat(compareAt);
  if (c <= p) return 0;
  return Math.round(((c - p) / c) * 100);
}
