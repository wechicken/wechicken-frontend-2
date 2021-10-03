import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const theme = {
  background: '#FFFEFC',
  white: '#FFFFFF',
  vermilion: '#ff7425',
  orange: '#FF9900',
  opacityOrange: 'rgba(242,153,74,0.5)',
  yellow: '#FFD66C',
  blue: '#1c7ed7',
  textGrey: '#8a8383',
  grey: 'rgba(196,196,196,0.3)',
  superLightGrey: 'rgb(214, 214, 214, 0.5)',
  lightGrey: 'rgb(214, 214, 214)',
  middleGrey: 'rgba(65,65,65,0.4)',
  deepGrey: '#828282',
  darkGrey: '#525151',
  lightOrange: 'rgba(255,195,170,0.3)',
  fontColor: '#2D2B2B',
  fontTitle: "'Alata', sans-serif;",
  fontContent: "'Noto Sans KR', sans-serif;",
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const padding = css`
  padding: 0 6vw;
`;

export const HeaderBox = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  ${padding}
  margin: 0 auto;
  position: relative;

  .title {
    width: ${({ width }) => width}px;
    height: 40px;
    margin-right: 20px;
    padding-bottom: 3px;
    font-family: ${theme.fontContent};
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
    border-bottom: 4px solid ${theme.orange};
  }

  @media (max-width: 375px) {
    flex-direction: column;
    .title {
      font-size: 20px;
    }
  }
`;

export const MainContentCards = styled.div`
  margin-top: 40px;
  padding: 0px !important;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PostWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 23%);
  grid-gap: 2rem;

  ${({ theme }) => theme.xl`
    width: 90%;
    align-items: center;
    grid-template-columns: repeat(3, 32%);
  `}

  ${({ theme }) => theme.lg`
    width: 80%;
    grid-template-columns: repeat(2, 45%);
  `}

  ${({ theme }) => theme.md`
    width: 100%;
    grid-template-columns: repeat(2, 45%);
    grid-gap: 1rem;
  `}

    ${({ theme }) => theme.sm`
    margin-top: 40px;
    display:flex;
    flex-wrap: wrap;
  `}
`;
