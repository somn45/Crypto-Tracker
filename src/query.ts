export const coinsFetch = () => {
  return fetch('https://api.coinpaprika.com/v1/coins').then((response) => response.json());
};

export const chartDataFetch = (coinId: string) => {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((response) =>
    response.json()
  );
};

export const priceDataFetch = (coinId: string) => {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((response) =>
    response.json()
  );
};

export const ohlcvDataFetch = (coinId: string) => {
  const endDay = new Date().toISOString();
  const startDay = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString();
  return fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDay}&end=${endDay}`
  ).then((response) => response.json());
};
