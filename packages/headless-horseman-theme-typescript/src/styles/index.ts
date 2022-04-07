import { css } from "frontity";

export const globalStyles: any = css`
  :root {
    --container-width: 1280px;
    --unit: 4px;
    --body-font-size: calc(var(--unit) * 5);
    --default-text-color: #000000;
    --default-background-color: #ffffff;
    --font-family:
      // Safari for OS X and iOS (San Francisco)
      -apple-system,
      // Chrome < 56 for OS X (San Francisco)
      BlinkMacSystemFont,
      // Windows
      "Segoe UI",
      // Android
      "Roboto",
      // Basic web fallback
      "Helvetica Neue",
      Arial, sans-serif,
      // Emoji fonts
      "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol" sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: var(--font-family);
    font-size: var(--body-font-size);
    line-height: 1.5;
    color: var(--default-text-color);
    background-color: var(--default-background-color);
  }

  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  button,
  input[type="submit"] {
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: inherit;
    line-height: 1.1;
    font-weight: bold;
    margin-bottom: calc(var(--unit) * 3);
  }

  /* Font sizes */
  h1 {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
  }

  h2 {
    font-size: 48px;
  }

  h3 {
    font-size: 32px;
  }

  h4 {
    font-size: 24px;
  }

  h5 {
    font-size: 18px;
  }

  p {
    margin-bottom: 30px;
  }

  ul,
  ol {
    margin-bottom: 30px;
  }
`;

export default globalStyles;
