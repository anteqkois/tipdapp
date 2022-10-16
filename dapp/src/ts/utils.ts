export enum asyncStatus {
  'idle' = 'idle',
  'loading' = 'loading',
  'success' = 'success',
  'fail' = 'fail',
}

export type ZodParseErrors = Record<string, string>;
