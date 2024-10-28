import { useContext, useEffect } from 'react';
import { StoreContext } from '../context';

const useOnEvent = (eventName: string, callback: (data: unknown) => void) => {
  const ctx = useContext(StoreContext)!;

  useEffect(() => {
    const listener = (e: any) => {
      callback(e.detail.data);
    };
    ctx.addEventListener(eventName, listener);
    return () => {
      ctx.removeEventListener(eventName, listener);
    };
  }, [callback]);
};

export { useOnEvent };
