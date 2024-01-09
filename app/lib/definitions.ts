export type AutoCompleteSymbols = {
  symbol: string;
  name: string;
};

export type Interval =
  | '1m'
  | '2m'
  | '5m'
  | '15m'
  | '30m'
  | '60m'
  | '90m'
  | '1h'
  | '1d'
  | '5d'
  | '1wk'
  | '1mo'
  | '3mo';

export type Quote = {
  [key: string]: any;
  shortName?: string;
  regularMarketChangePercent?: number;
  regularMarketPrice?: number;
  regularMarketVolume?: number;
  averageDailyVolume10Day?: number;
  symbol: string;
};

export type PNLData = {
  symbol: string;
  shares: number;
  averageCost: number;
  pnl: number;
  diversity: number;
};

export type TranscationData = {
  date?: Date;
  symbol?: string;
  shares: number;
  cost: number;
  totalCost?: number;
  userId?: string;
};
