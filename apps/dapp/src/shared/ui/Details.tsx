import { ReactNode, useState } from 'react';

type Props = {
  title: string;
  details: ReactNode;
};

export const Details = ({ title, details }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="mt-3 flex flex-row gap-1 pl-2 hover:cursor-pointer"
        role='presentation'
        onKeyDown={() => setOpen((prev) => !prev)}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={`mt-1.5 h-0 w-0 -rotate-90 border-x-[6px] border-t-8 border-x-transparent border-t-neutral-light ${
            open && '-rotate-0'
          }`}
        />
        <h6>{title}</h6>
      </div>
      {open && <p className="pl-6 pt-1">{details}</p>}
    </>
  );
};
