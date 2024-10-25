import { PropsWithChildren, useRef } from 'react';
import { StoreService } from './service/StoreService';
import { StoreContext } from './context';
import { useModuleMutation, useModuleSelector, useStoreClient } from './hooks';
import { ModuleType } from './store.types';

function EventStoreProvider({
  children,
  modules,
}: PropsWithChildren<{ modules: ModuleType<any>[] }>) {
  let storeService = useRef<StoreService | null>(null);
  if (!storeService.current) {
    storeService.current = new StoreService(modules);
  }
  return (
    <StoreContext.Provider value={storeService.current}>
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
