import { useContext } from 'react';
import { StoreContext } from '../context';

const useStoreClient = () => {
  const ctx = useContext(StoreContext)!;
  return ctx;
};

export { useStoreClient };
