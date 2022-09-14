import React from 'react';

export const FormikStepper = ({ children,handleSubmit,  status, step }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      <h1 className="flex items-center justify-center gap-3 text-4xl text-center">
        {childrenArray[step - 1].props.label}
        {/* Sign in */}
        {/* <Metamask className="text-7xl" /> */}
      </h1>
      <form onSubmit={handleSubmit}>{childrenArray[step - 1]}</form>
    </>
  );
};
