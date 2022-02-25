import { css } from "@emotion/react";
import { theme } from "./theme";

export const global = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    background: #f8f8f8;
    overflow-x: hidden;
    min-width: 320px;
    font-family: ${theme.fonts.body};
    min-height: 100%;
  }

  #__next {
    height: 100%;
    width: 100%;
    min-height: 100% !important;
    background: #fff;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: ${theme.fonts.default};
    font-size: ${theme.fontSizes.default};
  }

  h1 {
    font-size: ${theme.headerSizes.larger};
    font-weight: 300;
    line-height: 3.75rem;
  }

  h2 {
    font-size: ${theme.headerSizes.large};
    font-weight: 600;
    line-height: 1.625rem;
  }

  p {
    font-size: ${theme.fontSizes.default};
    font-weight: 300;
    line-height: 1.25rem;
  }

  label {
    font-weight: 600;
    line-height: 1.438rem;
    font-size: 1rem;

    + input,
    + textarea {
      display: block;
      margin-top: 0.5rem;
    }
  }

  input,
  textarea {
    padding-left: 0.844rem;
    font-family: ${theme.fonts.body};
    border: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 400px;
    height: 64px;
    background: #fff;
    border-radius: 8px;
    font-size: 1.5rem;
    font-weight: 400;
  }

  textarea {
    padding-top: 1rem;
  }

  input::placeholder {
    font-family: ${theme.fonts.body};
    font-size: 1.5rem;
    line-height: 1.875rem;
    font-weight: 300;
  }

  button {
    background: transparent;
    border: 0;
    outline: 0;
    margin: 0;
    padding: 0;
    position: relative;
    cursor: pointer;
  }
`;

export default global;
