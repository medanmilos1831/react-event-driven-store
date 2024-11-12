import { useContext } from 'react';
import { StoreContext } from '../context';

const useStateMutation = () => {
  const ctx = useContext(StoreContext)!;
  return ctx.mutationCommit();
};

export { useStateMutation };
