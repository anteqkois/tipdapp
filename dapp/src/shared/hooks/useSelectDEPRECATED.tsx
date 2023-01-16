// import { CheckIcon } from '@heroicons/react/24/outline';
// import * as ScrollArea from '@radix-ui/react-scroll-area';
// import * as Select from '@radix-ui/react-select';
// import classNames from 'classnames';
// import { ReactNode } from 'react';
// import { Button } from '../ui';
// export const ModalProvider = () => <div id="modal" />;

// export const useSelect = () => {
//   const SelectRoot = ({
//     children,
//     defaultValue,
//   }: {
//     children: ReactNode;
//     defaultValue?: string;
//   }) => {
//     return (
//       <Select.Root
//         defaultValue={'17'}
//         // defaultValue={defaultValue}
//       >
//         {children}
//       </Select.Root>
//     );
//   };

//   const SelectTrigger = ({
//     children,
//     placeholder,
//   }: {
//     children?: ReactNode;
//     placeholder: string;
//   }) => {
//     return (
//       <Select.Trigger
//         asChild
//         className="inline-flex items-center justify-center rounded p-2 bg-neutral-50"
//         aria-label={placeholder}
//       >
//         {/* <Select.Icon className="SelectIcon"> */}
//         <Button>
//           <Select.Value placeholder={placeholder} />
//         </Button>
//         {/* <Select.Icon className="">
//           <ChevronDownIcon />
//         </Select.Icon>
//         {children} */}
//       </Select.Trigger>
//     );
//   };

//   const SelectContent = ({ children }: { children: ReactNode }) => {
//     return (
//       <Select.Portal>
//         <Select.Content className="overflow-hidden bg-neutral-50 rounded shadow-md ring-1 ring-neutral-600 ring-opacity-10">
//           <ScrollArea.Root
//             className="w-full h-96 "
//             type="auto"
//           >
//             <Select.Viewport asChild>
//               <ScrollArea.Viewport  className="w-full h-full px-3">
//                 <Select.Group>
//                   <SelectLabel>Fruits</SelectLabel>
//                   <SelectItem value="apple">Apple</SelectItem>
//                   <SelectItem value="banana">Banana</SelectItem>
//                   <SelectItem value="blueberry">Blueberry</SelectItem>
//                   <SelectItem value="grapes">Grapes</SelectItem>
//                   <SelectItem value="pineapple">Pineapple</SelectItem>
//                   <SelectItem value="1">Pineapple</SelectItem>
//                   <SelectItem value="2">Pineapple</SelectItem>
//                   <SelectItem value="3">Pineapple</SelectItem>
//                   <SelectItem value="4">Pineapple</SelectItem>
//                   <SelectItem value="5">Pineapple</SelectItem>
//                   <SelectItem value="6">Pineapple</SelectItem>
//                   <SelectItem value="7">Pineapple</SelectItem>
//                   <SelectItem value="8">Pineapple</SelectItem>
//                   <SelectItem value="9">Pineapple</SelectItem>
//                   <SelectItem value="11">Pineapple</SelectItem>
//                   <SelectItem value="12">Pineapple</SelectItem>
//                   <SelectItem value="13">Pineapple</SelectItem>
//                   <SelectItem value="14">Pineapple</SelectItem>
//                   <SelectItem value="15">Pineapple</SelectItem>
//                   <SelectItem value="16">Pineapple</SelectItem>
//                   <SelectItem value="17">Pineapple</SelectItem>
//                   <SelectItem value="18">Pineapple</SelectItem>
//                 </Select.Group>
//               </ScrollArea.Viewport>
//             </Select.Viewport>
//             <ScrollArea.Scrollbar
//               className="flex w-4 py-1 px-1 bg-neutral-150"
//               orientation="vertical"
//             >
//               <ScrollArea.Thumb className="flex-1 bg-neutral-400 rounded-sm cursor-pointer" />
//             </ScrollArea.Scrollbar>
//           </ScrollArea.Root>
//         </Select.Content>
//       </Select.Portal>
//     );
//   };

//   const SelectLabel = ({ children }: { children: ReactNode }) => {
//     return (
//       <Select.Label className="text-primary select-none py-2">
//         {children}
//       </Select.Label>
//     );
//   };

//   const SelectItem = ({
//     children,
//     className,
//     value,
//     ...props
//   }: Select.SelectItemProps) => {
//     return (
//       <Select.Item
//         value={value}
//         className={classNames(
//           'relative flex items-center cursor-pointer rounded py-1 px-4 pl-7 focus-visible:ring-0 data-[highlighted]:bg-neutral-150',
//           className
//         )}
//         {...props}
//         // ref={forwardedRef}
//       >
//         <Select.ItemText>{children}</Select.ItemText>
//         <Select.ItemIndicator className="absolute left-1 inline-flex items-center justify-center">
//           <CheckIcon className="inline h-5" />
//         </Select.ItemIndicator>
//       </Select.Item>
//     );
//   };
//   return [
//     {
//       Root: SelectRoot,
//       Trigger: SelectTrigger,
//       Content: SelectContent,
//       Item: SelectItem,
//       Group: Select.Group,
//     },
//   ];
// };
