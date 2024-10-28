import { useContext } from 'react';
import { StoreContext } from '../context';

const useEmitEvent = () => {
  const ctx = useContext(StoreContext)!;
  return ctx.EMIT_EVENT;
};

export { useEmitEvent };
