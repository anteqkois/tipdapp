import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const Tooltip = ({ children, content }) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content sideOffset={4} className="inline-flex items-center bg-neutral-800 rounded-md px-4 py-2.5">
          <TooltipPrimitive.Arrow className="fill-current text-neutral" />
          <span className="block text-xs leading-none dark:text-neutral-150">{content}</span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;