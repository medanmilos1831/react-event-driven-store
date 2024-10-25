import { useContext } from 'react';
import { StoreContext } from '../context';

const useModuleMutation = (moduleName: string) => {
  const ctx = useContext(StoreContext)!;
  return ctx.MUTATION_COMMIT(moduleName);
};

export { useModuleMutation };
