import { PropsWithChildren } from 'react';
import { StoreService } from './service/StoreService';
import { StoreContext } from './context';
import { useModuleMutation, useModuleSelector, useStoreClient } from './hooks';

function EventStoreProvider({
  children,
  modules,
}: PropsWithChildren<{ modules: any }>) {
  return (
    <StoreContext.Provider value={new StoreService(modules)}>
      <>{children}</>
    </StoreContext.Provider>
  );
}

export {
  EventStoreProvider,
  useModuleMutation,
  useModuleSelector,
  useStoreClient,
};
