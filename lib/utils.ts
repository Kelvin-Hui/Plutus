import { clsx, type ClassValue } from 'clsx';
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

function stdTimezoneOffset() {
  const today = new Date();
  let jan = new Date(today.getFullYear(), 0, 1);
  let jul = new Date(today.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

function isDayLightSaving() {
  return new Date().getTimezoneOffset() < stdTimezoneOffset();
}

export function getMarketOpenTime() {
  let open = new Date();
  open.setUTCHours(isDayLightSaving() ? 13 : 14);
  open.setUTCMinutes(30);
  open.setUTCSeconds(0);
  open.setUTCMilliseconds(0);
  return open;
}

export function getMarketCloseTime() {
  let close = new Date();
  close.setUTCHours(isDayLightSaving() ? 20 : 21);
  close.setUTCMinutes(0);
  close.setUTCSeconds(0);
  close.setUTCMilliseconds(0);
  return close;
}

export function getStartingPeriod() {
  const currTime = new Date();
  const marketOpen = getMarketOpenTime();

  const day = marketOpen.getUTCDay();
  const date = marketOpen.getUTCDate();

  if (day == 6) {
    marketOpen.setDate(date - 1);
  } else if (day == 0) {
    marketOpen.setDate(date - 2);
  } else if (currTime < marketOpen) {
    //Before Market Open
    marketOpen.setUTCDate(date - (day == 1 ? 3 : 1));
  }
  return marketOpen.valueOf() / 1000;
}

export function numberFormat(num: number | undefined) {
  if (num === undefined) return num;
  if (num >= 100000) {
    let formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(num);
  }
  return num;
}

export function currencyFormat(num: number | undefined) {
  if (num === undefined || isNaN(num)) return '$0';
  let formatter = Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(num);
}

export function calculatePNL(
  marketPrice: number,
  cost: number,
  quantity: number,
) {
  return (marketPrice - cost) * quantity;
}
export function calculateROI(
  marketPrice: number,
  cost: number,
  quantity: number,
) {
  return (calculatePNL(marketPrice, cost, quantity) / (cost * quantity)) * 100;
}

export function calculateDiversity(
  marketPrice: number,
  quantity: number,
  totalProfolioValue: number,
) {
  return ((marketPrice * quantity) / totalProfolioValue) * 100;
}
