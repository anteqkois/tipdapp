type Props = {
  stepCount: number;
  icons: JSX.Element[];
  activeStep: number;
};

export const Stepper = ({ stepCount, icons, activeStep }: Props) => {
  const steps = Array.from({ length: stepCount }, (_, index) => (
      <span
        key={index}
        className={`relative w-9 h-9 mx-4 before:absolute before:h-2 before:w-[110%] before:-left-[105%] before:top-1/2 before:-translate-y-1/2 first-of-type:before:content-none ${
          index < activeStep ? 'before:bg-primary' : 'before:bg-neutral-150'
        }`}
      >
        <p
          className={`flex-center w-9 h-9 rounded-full absolute z-20 text-xl font-semibold ${
            index < activeStep
              ? 'bg-primary text-primary-50'
              : 'bg-neutral-150 text-primary'
          }`}
        >
          <span
            className={index < activeStep ? 'text-neutral-150' : 'text-primary'}
          >
            {icons[index]}
          </span>
        </p>
      </span>
    ));

  return <div className="flex flex-row justify-center">{steps}</div>;
};
