import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PriceBox = styled.div`
  width: 600px;
  background-color: ${(props) => props.theme.tabColor};
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

const PriceList = styled.li`
  width: 600px;
  height: 80px;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const PriceText = styled.h3`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const CoinRange = styled.span<{ range: number | undefined }>`
  color: ${(props) => (props.range > 0 ? 'red' : 'blue')};
`;

interface PriceProps {
  price?: number;
  ath_price?: number;
  percent_change_1h?: number;
  percent_change_6h?: number;
  percent_change_12h?: number;
  percent_change_24h?: number;
  percent_change_7d?: number;
  percent_change_30d?: number;
}

function Price({
  price,
  ath_price,
  percent_change_1h,
  percent_change_6h,
  percent_change_12h,
  percent_change_24h,
  percent_change_7d,
  percent_change_30d,
}: PriceProps) {
  return (
    <div>
      <PriceBox>
        <PriceList>
          <span>COIN CURRENT PRICE</span>
          <span>{`${price?.toFixed(2)}$`}</span>
        </PriceList>
        <PriceList>
          <span>COIN HIGHEST PRICE</span>
          <span>{`${ath_price?.toFixed(2)}$`}</span>
        </PriceList>
      </PriceBox>
      <PriceText>Compared Coin Range</PriceText>
      <PriceBox>
        <PriceList>
          <span>1 Hour</span>
          <CoinRange range={percent_change_1h}>{`${percent_change_1h}%`}</CoinRange>
        </PriceList>
        <PriceList>
          <span>6 Hours</span>
          <CoinRange range={percent_change_6h}>{`${percent_change_6h}%`}</CoinRange>
        </PriceList>
        <PriceList>
          <span>12 Hours</span>
          <CoinRange range={percent_change_12h}>{`${percent_change_12h}%`}</CoinRange>
        </PriceList>
      </PriceBox>
      <PriceBox>
        <PriceList>
          <span>1 Day</span>
          <CoinRange range={percent_change_24h}>{`${percent_change_24h}%`}</CoinRange>
        </PriceList>
        <PriceList>
          <span>7 Days</span>
          <CoinRange range={percent_change_7d}>{`${percent_change_7d}%`}</CoinRange>
        </PriceList>
        <PriceList>
          <span>30 days</span>
          <CoinRange range={percent_change_30d}>{`${percent_change_30d}%`}</CoinRange>
        </PriceList>
      </PriceBox>
    </div>
  );
}

export default Price;
