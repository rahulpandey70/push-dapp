// React + Web3 Essentials
import React from 'react';

// External Packages
import styled from 'styled-components';

// Internal Compoonents
import { ItemHV2, ItemVV2, SpanV2 } from 'components/reusables/SharedStylingV2';

// Internal Configs
import GLOBALS from 'config/Globals';
import { formatTokens, numberWithCommas } from 'helpers/StakingHelper';

const YieldStatsSection = ({
  getLpPoolStats,
  poolStats
}
) => {

  const [formattedDuration, setFormattedDuration] = React.useState('');

  const getFormattedDuration = () => {
    if (poolStats?.epochEndTimestamp) {
      const epochEndTimestamp = poolStats.epochEndTimestamp.toNumber();

      const duration = epochEndTimestamp - Math.floor(new Date() / 1000);

      if (duration < 0) {
        getLpPoolStats();
      }

      const day = parseInt(duration / 86400);
      const hour = parseInt((duration - day * 86400) / 3600);

      const minutes = parseInt((duration - (day * 86400 + hour * 3600)) / 60);
      const seconds = duration - (day * 86400 + hour * 3600 + minutes * 60);

      setFormattedDuration(`${day}D ${hour}H ${minutes}M ${seconds}S`);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      getFormattedDuration();
    }, 1000);
  });




  // RENDER
  return (
    <ItemHV2Modified>
      {/* Total Value Locked */}
      <StatsContainer justifyContent="stretch" background="linear-gradient(0deg, #7ADDB3, #7ADDB3), #FFFFFF">
        <BgCircleEffect background="radial-gradient(70% 90% at 40% 16.25%, #7CDCB4 2.6%, #7ADDB3 53.65%, #E888F8 85.42%, #F99DEA 100%)" />
        <StatsText>
          <SpanV2 color="#fff" fontSize="18px" fontWeight="600" lineHeight="141%">Total Value Locked</SpanV2>
          <SpanV2 color="#fff" fontSize="32px" fontWeight="700" lineHeight="141%">{`$ ${numberWithCommas(poolStats?.totalValueLocked)}`}</SpanV2>
        </StatsText>
      </StatsContainer>

      {/* Push Rewards Given */}
      <StatsContainer justifyContent="stretch" background="#F58DF8">
        <BgCircleEffect background="radial-gradient(70% 90% at 40% 16.25%, #F58DF8 2.6%, #F47EF8 53.65%, #A17DEF 85.42%, #AE68F4 100%)" />
        <StatsText>
          <SpanV2 color="#fff" fontSize="18px" fontWeight="600" lineHeight="141%">Push Rewards Given</SpanV2>
          <TextBox>
            <SpanV2 color="#fff" fontSize="32px" fontWeight="700" lineHeight="141%">
              {
                // TODO fix the calculation
                numberWithCommas(
                  Math.min(
                    // formatTokens(poolStats?.pushRewardsDistributed),
                    formatTokens(poolStats?.totalDistributedAmount)
                  ))}
            </SpanV2>
            <SpanV2 color="#fff" fontSize="16px" fontWeight="700" lineHeight="141%">
              out of {numberWithCommas(formatTokens(poolStats?.totalDistributedAmount))}
            </SpanV2>
          </TextBox>
        </StatsText>
      </StatsContainer>

      {/* Time Left */}
      <StatsContainer justifyContent="stretch" background="#A17DEF">
        <BgCircleEffect background="radial-gradient(70% 90% at 40% 16.25%, #A17DEF 2.6%, #9770ED 53.65%, #DF7EEF 85.42%, #F488E3 100%)" />
        <StatsText>
          <SpanV2 color="#fff" fontSize="18px" fontWeight="600" lineHeight="141%">Time Left</SpanV2>
          <TextBox>
            <SpanV2 color="#fff" fontSize="32px" fontWeight="700" lineHeight="141%">{formattedDuration}</SpanV2>
            <SpanV2 color="#fff" fontSize="16px" fontWeight="700" lineHeight="141%">until next epoch</SpanV2>
          </TextBox>
        </StatsText>
      </StatsContainer>
    </ItemHV2Modified>
  );
}
export default YieldStatsSection;

// css styles
const ItemHV2Modified = styled(ItemHV2)`
  column-gap: 12px;

  @media (max-width: 900px) {
    flex-direction: column;
    row-gap: 12px;
  }
`;

const StatsContainer = styled(ItemVV2)`
  position: relative;
  border-radius: 16px;
  overflow:hidden;
`;

const BgCircleEffect = styled(ItemVV2)`
  position: absolute;
  width: 170px;
  height: 170px;
  right: 5px;
  top: -35px;
  border-radius: 50%;

  box-shadow: 0px 30px 50px rgba(240, 86, 254, 0.5);
  filter: blur(2.5px);
`;

const TextBox = styled(ItemVV2)`
  justify-content: flex-start;
  align-items: flex-start;
`

const StatsText = styled(TextBox)`
  padding: 25px 10px 15px 15px;
  gap: 8px;
`;