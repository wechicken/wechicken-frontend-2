import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    background: string;
    white: string;
    vermilion: string;
    orange: string;
    opacityOrange: string;
    yellow: string;
    blue: string;
    textGrey: string;
    grey: string;
    superLightGrey: string;
    lightGrey: string;
    middleGrey: string;
    deepGrey: string;
    darkGrey: string;
    lightOrange: string;
    fontColor: string;
    fontTitle: string;
    fontContent: string;
    sm: (...args: Array) => SerializedStyles;
    md: (...args: Array) => SerializedStyles;
    lg: (...args: Array) => SerializedStyles;
    xl: (...args: Array) => SerializedStyles;
  }
}
