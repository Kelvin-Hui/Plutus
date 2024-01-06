'use server';
import yahooFinance from 'yahoo-finance2';
export async function autoComplete(term: string) {
  const result = await yahooFinance.search(term, { quotesCount: 5 });
  return result.quotes
    .filter((each) => each.isYahooFinance)
    .map((quote) => ({ symbol: quote.symbol, name: quote.shortname }));
}
