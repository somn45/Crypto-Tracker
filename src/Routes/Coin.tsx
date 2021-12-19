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
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 32px;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 40px;
`;

const Toggle = styled.button``;

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
  margin-top: 30px;
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

interface IPrice {
  total_supply: number;
  max_supply: number;
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
        <Link to="/">Home</Link>
        <Title>{state ? state.name : loading ? <h1>Loading...</h1> : chartData?.name}</Title>
        <Toggle>{/* 다크/라이트 모드 전환 스위치 */}</Toggle>
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
            <Route path={`/${coinId}/chart`} component={Chart}></Route>
            <Route path={`/${coinId}/price`} component={Price}></Route>
          </Switch>
        </div>
      )}
    </Wrapper>
  );
}

export default Coin;
