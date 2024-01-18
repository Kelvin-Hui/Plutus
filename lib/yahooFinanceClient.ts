import yahooFinance from 'yahoo-finance2';

const yfClientSingleton = () => {
  const yfClient = yahooFinance;
  yfClient.setGlobalConfig({
    queue: {
      concurrency: 8,
    },
  });
  return yfClient;
};

declare global {
  var yfClient: undefined | ReturnType<typeof yfClientSingleton>;
}

const yfClient = globalThis.yfClient ?? yfClientSingleton();

export default yfClient;

if (process.env.NODE_ENV !== 'production') globalThis.yfClient = yfClient;
