export const Stepper = ({ stepCount, activeStep }) => {
  const steps = Array.from({ length: stepCount }, (_, index) => {
    return (
      <span
        key={index}
        className={`relative w-8 h-8 mx-4 before:absolute before:h-2 before:w-[110%] before:-left-[105%] before:top-1/2 before:-translate-y-1/2 first-of-type:before:content-none ${
          index < activeStep ? 'before:bg-primary' : 'before:bg-neutral-200'
        }`}
      >
        <p
          className={`flex-center w-8 h-8 rounded-full absolute z-20 font-semibold ${
            index < activeStep ? 'bg-primary text-primary-50' : 'bg-neutral-200 text-primary'
          }`}
        >
          <span>{index + 1}</span>
        </p>
      </span>
    );
  });

  return <div className="flex flex-row justify-center">{steps}</div>;
};
