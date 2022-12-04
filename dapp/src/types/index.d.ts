export type AsyncStatus = 'idle' | 'loading' | 'success' | 'fail';
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type NavigationOption = {
  href: string;
  icon: JSX.Element;
  className?: string;
  tooltipLabel?: string;
  label?: string;
};

// export type ZodParseErrors = Record<string, string>;