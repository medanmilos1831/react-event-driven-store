import { PropsWithChildren, useRef } from 'react';
import { StoreService } from './service/StoreService';
import { StoreContext } from './context';
import { ModuleType } from './store.types';

function EventStoreProvider<T extends ModuleType<any>[] | any[]>({
  children,
  modules,
  logs = false,
}: PropsWithChildren<{ modules: T; logs?: boolean }>) {
  let storeService = useRef<StoreService | null>(null);
  if (!storeService.current) {
    storeService.current = new StoreService(modules, logs);
  }
  return (
    <StoreContext.Provider value={storeService.current}>
      <>{children}</>
    </StoreContext.Provider>
  );
}

export { EventStoreProvider };
