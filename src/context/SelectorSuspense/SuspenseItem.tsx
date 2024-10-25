import { useContext } from 'react';
import { SuspenseContext } from './context';

const SuspenseItem = () => {
  const ctx = useContext(SuspenseContext);
  console.log('item', ctx);
  return <>SuspenseItem</>;
};

export { SuspenseItem };
