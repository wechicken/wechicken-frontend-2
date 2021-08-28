import { css, SerializedStyles } from '@emotion/react';

export const breakpoints: { [index: string]: number } = {
  sm: 500,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
};

export const mediaQuery = Object.keys(breakpoints)
  .map(key => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key]) => {
    prev[key] = (...args: string[]) => css`
      @media only screen and (max-width: ${breakpoints[key]}px) {
        ${args}
      }
    `;
    return prev;
  }, {} as { [index: string]: (...args: string[]) => SerializedStyles });
