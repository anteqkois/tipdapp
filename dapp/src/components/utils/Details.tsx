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
        className="mt-3 pl-2 hover:cursor-pointer flex flex-row gap-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={`w-0 h-0 mt-1.5 border-x-[6px] border-x-transparent border-t-8 border-t-neutral-light -rotate-90 ${
            open && '-rotate-0'
          }`}
        ></span>
        <h6>{title}</h6>
      </div>
      {open && <p className="pl-6 pt-1">{details}</p>}
    </>
  );
};
