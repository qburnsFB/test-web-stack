import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    fonts: {
      body: string;
    };
    fontSizes: {
      large: string;
      default: string;
    };
    headerSizes: {
      larger: string;
      large: string;
    };
    zIndex: {
      highest: number;
      higher: number;
      high: number;
      medium: number;
      low: number;
      lower: number;
      lowest: number;
    };
  }
}
