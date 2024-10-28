import { PropsWithChildren, useRef } from 'react';
import { StoreService } from './service/StoreService';
import { StoreContext } from './context';
import { ModuleType } from './store.types';

function EventStoreProvider<T extends ModuleType<any>[] | any[]>({
  children,
  modules,
}: PropsWithChildren<{ modules: T }>) {
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

export { EventStoreProvider };
