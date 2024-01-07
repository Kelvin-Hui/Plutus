'use server';
import yahooFinance from 'yahoo-finance2';
import { Interval } from './definitions';
import { getStartingPeriod } from './utils';
export async function getAutoComplete(term: string) {
  const result = await yahooFinance.search(term, { quotesCount: 5 });
  return result.quotes
    .filter((each) => each.isYahooFinance)
    .map((quote) => ({ symbol: quote.symbol, name: quote.shortname }));
}

export async function getQuote(symbol: string) {
  const queryOptions = {
    fields: [
      'symbol',
      'shortName',
      'fullExchangeName',
      'regularMarketPrice',
      'regularMarketChangePercent',
    ],
  };
  const result = await yahooFinance.quote(symbol, queryOptions);
  //symbol, regularMarketPrice, fullExchangeName, shortName,  regularMarketChangePercent;
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

  const ohlcData = timestamp.map((time: number, idx: number) => ({
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

  const color = quote.close[0] > quote.close.slice(-1) ? 'red' : 'green';

  return [ohlcData, color];
}
