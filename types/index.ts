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
  quantity: number;
  cost: number;
  pnl: number;
  roi: number;
};

export type ProfolioData = {
  symbol?: string;
  quantity?: number;
  cost?: number;
  marketPrice?: number;
};

export type ProfolioOverviewData = {
  symbol: string;
  quantity: number;
  cost: number;
  marketPrice: number;
  marketValue?: number;
  diversityPercentage?: number;
};
export type TranscationData = {
  date?: Date;
  symbol?: string;
  quantity: number;
  cost: number;
  totalCost?: number;
  userId?: string;
};

export type BalanceHeaderProps = {
  totalBalance: number;
  PNL: number;
  PNLpercentage: number;
  isIncreasing: boolean;
};

export type RangeValues = {
  from?: Date;
  to?: Date;
};
