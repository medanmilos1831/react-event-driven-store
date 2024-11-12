import { PropsWithChildren, useRef, useState } from 'react';
import { StoreService } from './service/StoreService';
import { StoreContext } from './context';
import { ModuleType } from './store.types';

function EventStoreProvider<T extends ModuleType<any>[] | any[]>({
  children,
  modules,
  logs = false,
}: PropsWithChildren<{ modules?: T; logs?: boolean }>) {
  const [state, _] = useState(init);
  // let storeService = useRef<StoreService | null>(null);
  // if (!storeService.current) {
  //   storeService.current = new StoreService(modules, logs);
  // }
  function init() {
    return new StoreService(modules, logs);
  }
  return (
    <StoreContext.Provider value={state}>
      <>{children}</>
    </StoreContext.Provider>
  );
}

export { EventStoreProvider };
