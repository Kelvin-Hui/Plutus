'use server';

import { getChartQueryOptions, getStartingPeriod } from '@/lib/utils';
import yfClient from '@/lib/yahooFinanceClient';
import { TimeInterval } from '@/types';
import { intlFormatDistance } from 'date-fns';
import { unstable_cache as cache } from 'next/cache';

const SUPPORTED_QUOTETYPE = ['EQUITY', 'ETF', 'INDEX'];

export const getAutoComplete = cache(
  async (term: string) => {
    const result = await yfClient.search(term, { quotesCount: 5 });
    return result.quotes
      .filter((each) => each.isYahooFinance)
      .filter((each) => SUPPORTED_QUOTETYPE.includes(each.quoteType))
      .map((quote) => ({
        symbol: quote.symbol,
        name: quote.shortname,
        exchange: quote.exchDisp,
      }));
  },
  ['auto_complete'],
  {
    revalidate: 86400,
  },
);

export const getQuotes = cache(
  async (symbol: string | string[]) => {
    const result = await yfClient.quote(symbol);
    return result;
  },
  ['get_quotes'],
  { revalidate: 10 },
);

export const getSummaryDetail = cache(
  async (symbol: string, modules: any[]) => {
    const result = await yfClient.quoteSummary(symbol, { modules: modules });
    return result;
  },
  ['summary_detail'],
  { revalidate: 60 },
);

export const getQuoteNews = cache(
  async (symbol: string) => {
    const result = await yfClient.search(symbol, {
      quotesCount: 0,
      newsCount: 15,
    });
    const news = result.news.sort(
      (a, b) =>
        b.providerPublishTime.valueOf() - a.providerPublishTime.valueOf(),
    );
    return news.map((entry) => {
      return {
        ...entry,
        providerPublishTime: intlFormatDistance(
          entry.providerPublishTime,
          new Date(),
        ),
      };
    });
  },
  ['quote_news'],
  {
    revalidate: 3600,
  },
);

export const getRecommendationSymbols = cache(
  async (symbol: string) => {
    const recommends = await yfClient.recommendationsBySymbol(symbol);
    return recommends?.recommendedSymbols?.map((entry) => entry.symbol);
  },
  ['recommended_symbols'],
  { revalidate: 86400 },
);

export const getRecommendationQuotes = cache(
  async (symbol: string) => {
    const recommendsSymbols = await getRecommendationSymbols(symbol);
    const result = await yfClient.quote(recommendsSymbols);
    return result;
  },
  ['recommended_quotes'],
  {
    revalidate: 60,
  },
);

export const getTrendingSymbols = cache(
  async () => {
    const trending = await yfClient.trendingSymbols('US', {
      count: 20,
      lang: 'en-us',
      region: 'US',
    });
    return trending?.quotes?.map((entry) => entry.symbol);
  },
  ['trending_symbols'],
  {
    revalidate: 300,
  },
);

export const getTrendingQuotes = cache(
  async () => {
    const trendingSymbols = await getTrendingSymbols();
    const result = await yfClient.quote(
      trendingSymbols,
      {
        fields: [
          'symbol',
          'shortName',
          'regularMarketPrice',
          'regularMarketChangePercent',
          'regularMarketVolume',
          'regularMarketChange',
          'quoteType',
          'currency',
        ],
      },
      { validateResult: false },
    );
    return result
      .filter((obj: any) => SUPPORTED_QUOTETYPE.includes(obj.quoteType))
      .filter((obj: any) => obj.currency === 'USD')
      .slice(0, 10);
    // return result
  },
  ['trending_quotes'],
  { revalidate: 60 },
);

export const get1minChartData = cache(
  async (symbol: string) => {
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
  },
  ['get_1min_chart_data'],
  { revalidate: 10 },
);

export const getChartData = cache(
  async (symbol: string, timeInterval: TimeInterval) => {
    const { period1, interval } = getChartQueryOptions(timeInterval);
    const result = await yfClient.chart(
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
  },
  ['get_chart_data'],
  { revalidate: 10 },
);
