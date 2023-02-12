import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ReactNode, RefAttributes } from 'react';

type Props = {
  children: ReactNode;
  content: string;
} & TooltipPrimitive.TooltipContentProps &
  RefAttributes<HTMLDivElement>;

export const Tooltip = ({ children, content, ...rest }: Props) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        sideOffset={4}
        className="inline-flex items-center rounded-md bg-neutral-800 px-4 py-2.5"
        {...rest}
      >
        <TooltipPrimitive.Arrow className="fill-current text-neutral" />
        <span className="block text-xs leading-none dark:text-neutral-150">
          {content}
        </span>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);
