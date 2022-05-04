import { css } from "frontity";
import { Breakpoints, Colors, HasBreakpoints } from "./types";

/**
 * Colors of the theme
 */
export const colors: Colors = {
  white: "#fff",
  black: "#090909",
  "text-white": "rgba(255,255,255,.5)",
};

// Re-exporting the types so everything can be imported from the same file
export type { Breakpoints, HasBreakpoints };

export const breakpoints: Breakpoints = {
  /* Small only */
  "small only": "@media screen and (max-width: 768px)",

  /* Medium and up */
  medium: "@media screen and (min-width: 769px)",

  /* Medium only */
  "medium only": "@media screen and (min-width: 769px) and (max-width: 1024px)",

  /* Large and up */
  large: "@media screen and (min-width: 1025px)",

  /* Large only */
  "large only": "@media screen and (min-width: 1025px) and (max-width: 1200px)",

  /* Large only */
  "x-large": "@media screen and (min-width: 1201px)",

  /* Large only */
  "x-large only":
    "@media screen and (min-width: 1201px) and (max-width: 1440px)",

  /* Large only */
  "xxl-large": "@media screen and (min-width: 1441px)",

  /* Large only */
  "xxl-large only":
    "@media screen and (min-width: 1441px) and (max-width: 1920px)",
};

export const globalStyles: any = css`
  :root {
    /* create css vars from colors object */
    ${Object.entries(colors).map(
      ([key, value]) =>
        `--${key}: ${typeof value === "function" ? value() : value};`
    )}
    --unit: 4px;

    --header-height: 100px;

    /**Fonts */
    --body-font-size: calc(var(--unit) * 4); /** 16px standard body font size */
    --body-font: "Helvetica", sans-serif;
    --heading-font: "Helvetica", sans-serif;

    --body-text-color: "#333333";
  }

  /**Layout / Container */
  --container-width: 1320px;
  --main-container-padding: 8px; /** Default container and body padding. This is for mobile */
  ${breakpoints["medium"]} {
    :root {
      --main-container-padding: 16px;
    }
  }

  /** Rest */
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
    width: 100%;
    overflow-x: hidden;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: var(--body-font);
    font-size: var(--body-font-size);
    line-height: 1.5;
    color: var(--body-text-color);
    background-color: white;

    small {
      font-size: calc(var(--body-font-size) * 0.8);
    }

    .bigger {
      font-size: calc(var(--body-font-size) * 1.2);
    }
  }

  /* Color vars for Gutenberg */
  ${Object.entries(colors).map(([key, value]) => {
    if (typeof value != "function") {
      return css`
        .has-${key}-color {
          color: ${value};
        }

        .has-${key}-background-color {
          background-color: ${value} !important;
        }
      `;
    }
  })}

  /* Hiding classes */
  .hide {
    display: none;
  }

  ${Object.entries(breakpoints).map(
    ([key, value]) => css`
      ${value} {
        .hide-for-${key.replace(" ", "-")} {
          display: none;
        }
      }
    `
  )}

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

  ${breakpoints["small only"]} {
    h1 {
      font-size: 40px;
      line-height: 46px;
    }
    h2 {
      font-size: 28px;
    }
    h3 {
      font-size: 24px;
    }

    p {
      font-size: 14px;
      line-height: 22px;
    }
  }

  /*  Remove default browser styling for <figure>  */
  figure {
    /* all: unset; */
    clear: both;

    &.wp-block-image img {
      width: auto;
      height: auto;
    }
  }

  /* text alignment classes: text-center, text-right */
  ${["right", "center", "left"].map(
    (al) => `
    .text-${al} {
      text-align: ${al};
    }
    ${breakpoints["medium"]} {
      .medium-text-${al} {
        text-align: ${al};
      }
    }

    ${breakpoints["small only"]} {
      .small-only-text-${al} {
        text-align: ${al};
      }
    }
  `
  )}

  /** Reverse Order & custom order classes */
  .reverse-order {
    ${breakpoints["small only"]} {
      div:first-child {
        order: 1;
      }
      div:last-child {
        order: 0;
      }
    }
  }

  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
    (pos) => css`
      .order-${pos} {
        order: ${pos};
      }
      ${breakpoints["small only"]} {
        .small-only-order-${pos} {
          order: ${pos};
        }
      }
    `
  )}

  ${breakpoints["medium"]} {
    .half-paragraph {
      width: 66%;
    }
  }

  /* WordPress Core Align Classes */
  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;

export default globalStyles;
