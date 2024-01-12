'use server';

import { getStartingPeriod } from '@/lib/utils';
import { Interval } from '@/types';
import yahooFinance from 'yahoo-finance2';

export async function getAutoComplete(term: string) {
  const result = await yahooFinance.search(term, { quotesCount: 5 });
  return result.quotes
    .filter((each) => each.isYahooFinance)
    .map((quote) => ({ symbol: quote.symbol, name: quote.shortname }));
}

export async function getQuote(symbol: string | string[]) {
  const result = await yahooFinance.quote(symbol);
  return result;
}

export async function getChartData(symbol: string, interval: Interval) {
  //[Mon-Fri] Within Market Hours -> 930 - 400
  //[Mon-Fri] Before Market Hours -> Previous 930 - 400
  //[Mon-Fri] After Market Hours -> 930 - 400
  //[Sat-Sun] Anytime -> [Fri] MarketHours
  // const result = await yahooFinance._chart(symbol, {period1 : getStartingPeriod(), return : "object", includePrePost : false, interval : interval});

  const request = await fetch(
    `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?${
      interval == '1m' ? 'period1=' + getStartingPeriod() : ''
    }&interval=${interval}&period2=${9999999999}&includePrePose=false`,
  );

  const response = await request.json();

  const result = response?.chart?.result[0];

  const timestamp = result?.timestamp;
  const quote = result?.indicators?.quote[0];

  const ohlcData = timestamp?.map((time: number, idx: number) => ({
    date: new Date(time * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    open: quote.open[idx],
    high: quote.high[idx],
    low: quote.low[idx],
    close: quote.close[idx],
    volume: quote.volume[idx],
  }));

  const color = quote?.close?.[0] > quote?.close?.slice(-1) ? 'red' : 'green';

  return [ohlcData, color];
}

export async function getSummaryDetail(symbol: string) {
  const result = await yahooFinance.quoteSummary(symbol, {
    modules: ['summaryDetail'],
  });
  return result.summaryDetail;
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
  const trending = await yahooFinance.trendingSymbols('US', {
    count: 10,
    lang: 'en-us',
  });
  const result = await yahooFinance.quote(
    trending?.quotes?.map((row) => row.symbol),
  );
  return result;
}
