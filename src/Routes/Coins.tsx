import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { coinsFetch } from '../query';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 1800px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 32px;
  color: ${(props) => props.theme.accentColor};
  padding-top: 40px;
  margin-bottom: 30px;
`;

const Coin = styled.div`
  width: 100%;
  max-width: 420px;
  height: 80px;
  padding-left: 20px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
  a {
    width: 100%;
    padding: 20px 0;
    font-size: 20px;
    display: block;
    color: ${(props) => props.theme.bgColor};
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface ICoins {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>('coins', coinsFetch);
  return (
    <Wrapper>
      <Title>Coin Tracker</Title>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        data?.slice(0, 100).map((coin) => (
          <Coin key={coin.id}>
            <Link
              to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}
            >
              {coin.name}
            </Link>
          </Coin>
        ))
      )}
    </Wrapper>
  );
}

export default Coins;
