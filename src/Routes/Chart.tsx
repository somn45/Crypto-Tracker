import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ohlcvDataFetch } from '../query';
import ApexChart from 'react-apexcharts';

interface IParams {
  coinId: string;
}

interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

function Chart() {
  const { coinId } = useParams<IParams>();
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcvData', coinId], () =>
    ohlcvDataFetch(coinId)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <h1>Loading Chart...</h1>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                const dateTime = price.time_close;
                const ohlcvDataList = [price.open, price.high, price.low, price.close];
                return { x: dateTime, y: ohlcvDataList };
              }),
            },
          ]}
          options={{
            chart: {
              type: 'candlestick',
              background: 'transparent',
              width: 600,
              height: 350,
            },
            grid: {
              show: false,
            },
            title: {
              text: 'Coin Price Chart',
              align: 'center',
            },
            theme: {
              mode: 'dark',
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              labels: {
                formatter: (val) => val.toFixed(0),
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
