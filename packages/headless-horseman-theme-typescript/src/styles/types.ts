export interface Breakpoints {
  "small only": string;
  medium: string;
  "medium only": string;
  large: string;
  "large only": string;
  "x-large": string;
  "x-large only": string;
  "xxl-large": string;
  "xxl-large only": string;
}

// to be added to components that receive breakpoints prop
export interface HasBreakpoints {
  breakpoints?: Breakpoints;
}

export interface Colors {
  white: string;
  black: string;
  "text-white": string;
}
