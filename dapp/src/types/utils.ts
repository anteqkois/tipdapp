export enum asyncStatus {
  'idle' = 'idle',
  'loading' = 'loading',
  'success' = 'success',
  'fail' = 'fail',
}

// export type asyncStatus = 'idle' | 'loading' | 'success' | 'fail';

export type NavigationOption = {
  href: string;
  icon: JSX.Element;
  className: string;
  tooltipLabel?: string;
  label?: string;
};

export type ZodParseErrors = Record<string, string>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiError = any;
export type ValidationErrors = any;
export type ValidationError = any;
