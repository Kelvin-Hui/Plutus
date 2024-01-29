import { Interval, TimeInterval, TransactionData } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function useDebouncedCallback(
  callback: Function,
  wait: number,
): Function {
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

export function getMarketOpenTime(date: Date = new Date()): Date {
  let open = !date ? new Date() : new Date(date);
  open.setUTCHours(isDayLightSaving() ? 13 : 14);
  open.setUTCMinutes(30);
  open.setUTCSeconds(0);
  open.setUTCMilliseconds(0);
  return open;
}

export function getMarketCloseTime(date: Date = new Date()): Date {
  let close = !date ? new Date() : new Date(date);
  close.setUTCHours(isDayLightSaving() ? 20 : 21);
  close.setUTCMinutes(0);
  close.setUTCSeconds(0);
  close.setUTCMilliseconds(0);
  return close;
}

export function numberFormat(num: number | undefined): string | undefined {
  if (num === undefined) return num;
  if (num >= 100000) {
    let formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(num);
  }
  return num.toString();
}

export function percentageFormat(num: number | undefined): string {
  if (num === undefined || isNaN(num)) return '0.00%';
  return (num >= 0 ? '+' : '') + num.toFixed(2) + '%';
}

export function currencyFormat(num: number | undefined): string {
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
): number {
  return (marketPrice - cost) * quantity;
}
export function calculateROI(
  marketPrice: number,
  cost: number,
  quantity: number,
): number {
  return (calculatePNL(marketPrice, cost, quantity) / (cost * quantity)) * 100;
}

export function calculateDiversity(
  marketPrice: number,
  quantity: number,
  totalPortfolioValue: number,
): number {
  return ((marketPrice * quantity) / totalPortfolioValue) * 100;
}

export function calculateTodayReturn(
  marketPrice: number,
  marketChange: number,
  quantity: number,
  prevClose: number,
  history: TransactionData[],
): number {
  let todayReturn = 0;
  let shareBoughtToday = 0;
  history
    .filter(
      (transaction) =>
        (transaction.createdAt >= getStartingPeriod() ||
          transaction.cost >= prevClose) &&
        transaction.quantity > 0,
    )
    .forEach((transaction) => {
      shareBoughtToday += transaction.quantity;
      todayReturn += (marketPrice - transaction.cost) * transaction.quantity;
    });
  return (todayReturn += marketChange * (quantity - shareBoughtToday));
}

export function addMinute(prevDate: Date): Date {
  let date = new Date(prevDate.valueOf());
  date.setMinutes(date.getMinutes() + 1);
  return date;
}
export function nextDay(prevDate: Date | undefined): Date {
  let date = prevDate ? new Date(prevDate) : new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

export function getStartingPeriod(): Date {
  const currTime = new Date();
  const marketOpen = getMarketOpenTime();

  const day = marketOpen.getUTCDay();
  const date = marketOpen.getUTCDate();

  if (day == 6) {
    marketOpen.setUTCDate(date - 1);
  } else if (day == 0) {
    marketOpen.setUTCDate(date - 2);
  } else if (currTime < marketOpen) {
    //Before Market Open
    marketOpen.setUTCDate(date - (day == 1 ? 3 : 1));
  }

  return new Date(marketOpen);
}

export function getEndingPeriod(): Date {
  return getMarketCloseTime(getStartingPeriod());
}

export function isMarketHours(): boolean {
  const date = new Date();
  if (date.getUTCDay() == 6 || date.getUTCDay() == 0) return false;
  const start = getStartingPeriod();
  const end = addMinute(getEndingPeriod());
  return start <= date && date <= end;
}

export function getChartQueryOptions(timeInterval: TimeInterval): {
  period1: Date;
  interval: Interval;
} {
  let period1 = new Date();
  let interval: Interval = '1d';
  period1.setUTCHours(0, 0, 0, 0);
  const date = period1.getDate();
  const month = period1.getMonth();
  const year = period1.getFullYear();
  switch (timeInterval) {
    case '5d':
      period1.setDate(date - 5);
      interval = '5m';
      break;
    case '1m':
      period1.setMonth(month - 1);
      interval = '30m';
      break;
    case '6m':
      period1.setMonth(month - 6);
      interval = '1d';
      break;
    case 'YTD':
      period1 = new Date(`${year}-01-01`);
      interval = '1d';
      break;
    case '1y':
      period1.setFullYear(year - 1);
      interval = '1d';
      break;
    case '5y':
      period1.setFullYear(year - 5);
      interval = '1wk';
      break;
    case 'Max':
      interval = '1mo';
      period1 = new Date(0);
      break;
  }
  const day = period1.getDay();
  if (day == 6) {
    period1.setDate(period1.getDate() - 1);
  } else if (day == 0) {
    period1.setDate(period1.getDate() - 2);
  }
  return { period1, interval };
}

export function padChartData(data: any): any {
  const startPeriod = getStartingPeriod();
  const endPeriod = getEndingPeriod();
  let currDate = new Date(data.slice(-1)[0].date ?? startPeriod);

  if (currDate === endPeriod) return data;
  const padData = [];
  for (; currDate <= endPeriod; currDate = addMinute(currDate)) {
    padData.push({
      date: new Date(currDate.valueOf()),
      close: null,
    });
  }
  return [...data, ...padData];
}

export function determineYAxisWidth(value: number | undefined): number {
  if (!value) return 56;
  const numOfDigits = value.toString().split('.')[0].length;
  switch (numOfDigits) {
    case 1:
      return 40;
    case 2:
      return 48;
    case 3:
      return 56;
    case 4:
      return 64;
    case 5:
      return 72;
    case 6:
      return 80;
    case 7:
      return 88;
    case 8:
      return 96;
    case 9:
      return 104;
    default:
      throw Error('Value Too High😵');
  }
}
