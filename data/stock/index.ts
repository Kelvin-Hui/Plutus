'use server';

import { getChartQueryOptions, getStartingPeriod } from '@/lib/utils';
import { TimeInterval } from '@/types';
import { unstable_noStore } from 'next/cache';
import yahooFinance from 'yahoo-finance2';

const SUPPORTED_QUOTETYPE = ['EQUITY', 'ETF', 'INDEX'];

export async function getAutoComplete(term: string) {
  const result = await yahooFinance.search(term, { quotesCount: 5 });
  return result.quotes
    .filter((each) => each.isYahooFinance)
    .filter((each) => SUPPORTED_QUOTETYPE.includes(each.quoteType))
    .map((quote) => ({
      symbol: quote.symbol,
      name: quote.shortname,
      exchange: quote.exchDisp,
    }));
}

export async function getQuote(symbol: string | string[]) {
  const result = await yahooFinance.quote(symbol);
  return result;
}

export async function getSummaryDetail(symbol: string, modules: any[]) {
  const result = await yahooFinance.quoteSummary(symbol, { modules: modules });
  return result;
}

export async function getQuoteNews(symbol: string) {
  const result = await yahooFinance.search(symbol, {
    quotesCount: 0,
    newsCount: 10,
  });
  return result?.news;
}

export async function getRecommandationSymbols(symbol: string) {
  const recommands = await yahooFinance.recommendationsBySymbol(symbol);
  const result = await yahooFinance.quote(
    recommands?.recommendedSymbols?.map((row) => row.symbol),
  );
  return result;
}

export async function getTrendingSymbols() {
  unstable_noStore();
  const trending = await yahooFinance.trendingSymbols('US', {
    count: 30,
    lang: 'en-us',
    region: 'US',
  });
  const result = await yahooFinance.quote(
    trending?.quotes?.map((row) => row.symbol),
    {},
    { validateResult: false },
  );
  return result
    .filter((obj: any) => SUPPORTED_QUOTETYPE.includes(obj.quoteType))
    .filter((obj: any) => obj.currency === 'USD')
    .slice(0, 10);
}

export async function get1minChartData(symbol: string) {
  const request = await fetch(
    `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${
      getStartingPeriod().valueOf() / 1000
    }&interval=1m&period2=${9999999999}&includePrePost=false`,
  );
  const response = await request.json();
  const result = response?.chart?.result[0];

  const timestamp = result?.timestamp;
  const quote = result?.indicators?.quote[0];

  const ohlcData = timestamp?.map((time: number, idx: number) => ({
    date: new Date(time * 1000),
    open: quote.open[idx],
    high: quote.high[idx],
    low: quote.low[idx],
    close: quote.close[idx],
    volume: quote.volume[idx],
  }));
  return ohlcData;
}

export async function getChartData(symbol: string, timeInterval: TimeInterval) {
  unstable_noStore();
  if (timeInterval == '1d') {
    return await get1minChartData(symbol);
  }

  const { period1, interval } = getChartQueryOptions(timeInterval);
  const result = await yahooFinance.chart(
    symbol,
    {
      period1: period1,
      period2: new Date().toISOString().slice(0, 10),
      interval: interval,
      events: '',
      includePrePost: false,
    },
    { validateResult: false },
  );
  return result?.quotes.map((quote: any) => {
    return { ...quote, date: quote.date };
  });
}
