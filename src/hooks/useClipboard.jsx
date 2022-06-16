import React, { useState } from 'react';

const fulfilledDefault = (data) => {
  console.log('You copy:', data);
};
const rejectedDefault = (data) => {
  console.error("Doesn't copy data");
};

const useClipboard = (initValue) => {
  const [value, setValue] = useState(initValue ?? '');

  const pasteToClipboard = () => {
    navigator.clipboard.writeText(value).then(
      () => {
        fulfilledDefault(value);
      },
      () => {
        rejectedDefault();
      },
    );
  };

  return [pasteToClipboard, setValue, value];
};

export default useClipboard;
