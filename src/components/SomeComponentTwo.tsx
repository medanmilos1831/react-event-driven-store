import { useState } from 'react';
import { useOnEvent } from '../context';

const SomeComponentTwo = () => {
  const [state, setState] = useState(0);
  useOnEvent('INC_AGE', (data) => {
    console.log('pera', data, state);
  });
  return (
    <>
      <button
        onClick={() => {
          setState((prev: any) => prev + 1);
        }}
      >
        {state}
      </button>
    </>
  );
};

export { SomeComponentTwo };
