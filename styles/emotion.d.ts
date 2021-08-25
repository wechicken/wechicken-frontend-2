import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    background: string;
    white: string;
    vermilion: string;
    orange: string;
    opacityOrange: string;
    yellow: string;
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
    sm: (...args: TemplateStringsArray[]) => SerializedStyles;
    md: (...args: TemplateStringsArray[]) => SerializedStyles;
    lg: (...args: TemplateStringsArray[]) => SerializedStyles;
    xl: (...args: TemplateStringsArray[]) => SerializedStyles;
  }
}
