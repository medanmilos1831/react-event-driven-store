import { useContext } from 'react';
import { StoreContext } from '../context';

const useEmitEvent = () => {
  const ctx = useContext(StoreContext)!;
  return ctx.emitEvent;
};

export { useEmitEvent };
