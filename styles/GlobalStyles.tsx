import { Global, css } from '@emotion/react';
import { breakpoints } from './media';

const style = css`
  * {
    margin: 0;
    padding: 0;
  }

  :root {
    font-size: 0.625em;
  }
  @media (${`min-width: ${breakpoints.sm}px`}) {
    :root {
      font-size: 0.75em;
    }
  }
  @media (${`min-width: ${breakpoints.md}px`}) {
    :root {
      font-size: 0.875em;
    }
  }
  @media (${`min-width: ${breakpoints.lg}px`}) {
    :root {
      font-size: 1em;
    }
  }

  body {
    box-sizing: border-box;
    font-family: 'NotoSansKR', sans-serif;

    .noDrag {
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    }
  }
`;

const GlobalStyle = (): JSX.Element => {
  return <Global styles={style} />;
};

export default GlobalStyle;
