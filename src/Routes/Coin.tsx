import { useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Price from './Price';
import Chart from './Chart';
import { useQuery } from 'react-query';
import { chartDataFetch, priceDataFetch } from '../query';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 600px;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  * {
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const HomeLink = styled.div`
  display: flex;
  a {
    align-self: flex-start;
  }
`;

const Title = styled.h2`
  text-align: center;
  padding-bottom: 15px;
  font-size: 32px;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 40px;
  align-self: flex-start;
`;

const Toggle = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  outline: none;
  background-color: transparent;
  align-self: flex-start;
`;

const TabList = styled.ul`
  width: 600px;
  min-width: 420px;
  height: 80px;
  border-radius: 20px;
  padding: 0 20px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TabItem = styled.li`
  width: 200px;
  height: 60px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const DescriptionBox = styled.div`
  width: 600px;
  min-width: 420px;
  padding-left: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 20px 0;
`;

const NavigaterBox = styled.div`
  width: 600px;
  min-width: 420px;
  height: 40px;
  border-radius: 20px;
  margin: 30px 0;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const Navigation = styled.div<{ isActive?: boolean }>`
  border-radius: 10px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    width: 100%;
    padding: 10px 0;
    color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
    display: block;
    text-align: center;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface ILocation {
  name: string;
}

interface IParams {
  coinId: string;
}

interface IChart {
  rank: number;
  name: string;
  symbol: string;
  description: string;
  open_source: boolean;
}

export interface IPrice {
  total_supply: number;
  max_supply: number;
  quotes: {
    USD: {
      price: number;
      ath_price: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<IParams>();
  const { state } = useLocation<ILocation>();
  const chartMatch = useRouteMatch('/:coinId/chart');
  const priceMatch = useRouteMatch('/:coinId/price');
  const { isLoading: chartLoading, data: chartData } = useQuery<IChart>(['chartData', coinId], () =>
    chartDataFetch(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPrice>(['priceData', coinId], () =>
    priceDataFetch(coinId)
  );
  const loading = chartLoading || priceLoading;
  return (
    <Wrapper>
      <Header>
        <HomeLink>
          <Link to="/">Home</Link>
        </HomeLink>
        <Title>{state ? state.name : loading ? <h1>Loading...</h1> : chartData?.name}</Title>
        <div>
          <Toggle>{/* 다크/라이트 모드 전환 스위치 */}</Toggle>
        </div>
      </Header>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <TabList>
            <TabItem>
              <span>RANK: </span>
              <span>{chartData?.rank}</span>
            </TabItem>
            <TabItem>
              <span>SYMBOL: </span>
              <span>{chartData?.symbol}</span>
            </TabItem>
            <TabItem>
              <span>OPEN SOURCE: </span>
              <span>{`${chartData?.open_source}`.toUpperCase()}</span>
            </TabItem>
          </TabList>
          <DescriptionBox>
            <p>{chartData?.description}</p>
          </DescriptionBox>
          <TabList>
            <TabItem>
              <span>TOTAL SUPPLY: </span>
              <span>{priceData?.total_supply}</span>
            </TabItem>
            <TabItem>
              <span>MAX SUPPLY: </span>
              <span>{priceData?.max_supply}</span>
            </TabItem>
          </TabList>
          {/* Nested Router */}

          <NavigaterBox>
            <Navigation>
              <Link
                to={{
                  pathname: `/${coinId}`,
                }}
              >
                Back
              </Link>
            </Navigation>
            <Navigation isActive={chartMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/chart`,
                }}
              >
                Chart
              </Link>
            </Navigation>
            <Navigation isActive={priceMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/price`,
                }}
              >
                Price
              </Link>
            </Navigation>
          </NavigaterBox>

          <Switch>
            <Route path="/:coinId/chart" component={Chart}></Route>
            <Route path={`/${coinId}/price`} component={Price}>
              <Price
                price={priceData?.quotes.USD.price}
                ath_price={priceData?.quotes.USD.ath_price}
                percent_change_1h={priceData?.quotes.USD.percent_change_1h}
                percent_change_6h={priceData?.quotes.USD.percent_change_6h}
                percent_change_12h={priceData?.quotes.USD.percent_change_12h}
                percent_change_24h={priceData?.quotes.USD.percent_change_24h}
                percent_change_7d={priceData?.quotes.USD.percent_change_7d}
                percent_change_30d={priceData?.quotes.USD.percent_change_30d}
              />
            </Route>
          </Switch>
        </div>
      )}
    </Wrapper>
  );
}

export default Coin;
