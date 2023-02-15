export const transformApiInclude = <T extends object>(
  include: Array<keyof T>
) => {
  const result: Record<keyof T, boolean> = {} as Record<keyof T, boolean>;
  include.forEach((val: keyof T) => {
    result[val] = true;
  });
  return result;
};
