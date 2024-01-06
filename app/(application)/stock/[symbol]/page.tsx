export default function Page({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol;
  return <div> Stock {symbol} page</div>;
}
