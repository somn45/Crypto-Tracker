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
