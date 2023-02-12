type Props = {
  stepCount: number;
  icons: JSX.Element[];
  activeStep: number;
};

export const Stepper = ({ stepCount, icons, activeStep }: Props) => {
  const steps = Array.from({ length: stepCount }, (_, index) => (
    <span
      key={index}
      className={`relative mx-4 h-9 w-9 before:absolute before:-left-[105%] before:top-1/2 before:h-2 before:w-[110%] before:-translate-y-1/2 first-of-type:before:content-none ${
        index < activeStep ? 'before:bg-primary' : 'before:bg-neutral-150'
      }`}
    >
      <p
        className={`flex-center absolute z-20 h-9 w-9 rounded-full text-xl font-semibold ${
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
