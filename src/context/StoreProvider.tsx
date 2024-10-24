import {
  createContext,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { IStore } from './store.types';
import { StoreService } from './StoreService';

const StoreContext = createContext<IStore | undefined>(undefined);

function EventStoreProvider({
  children,
  modules,
}: PropsWithChildren<{ modules: any }>) {
  const [storeSerivce, _] = useState<any>(new StoreService(modules));
  return (
    <StoreContext.Provider value={storeSerivce}>
      <>
        <div>{children}</div>
      </>
    </StoreContext.Provider>
  );
}
const useStoreClient = () => {
  const ctx = useContext(StoreContext)!;
  return ctx;
};

const useModuleMutation = (moduleName: string) => {
  const ctx = useContext(StoreContext) as any;
  return ctx.MUTATION_COMMIT(moduleName);
};

function useModuleSelector({ getter, commit, moduleName }: any) {
  const ctx = useContext(StoreContext)!;
  const [_, render] = useState<number>(0);

  let selector = useRef<any>(null);
  if (!selector.current) {
    selector.current = ctx.SELECTOR_CREATOR();
  }
  useLayoutEffect(() => {
    if (!commit || commit.length === 0) return;
    const listener = () => render((p) => p + 1);
    commit.forEach((eventName: string) => {
      ctx.addEventListener(eventName, listener);
    });

    return () => {
      if (!commit || commit.length === 0) return;
      commit.forEach((eventName: string) => {
        ctx.removeEventListener(eventName, listener);
      });
    };
  }, []);
  return {
    value: selector.current.subscriber.bind({
      getter,
      moduleName,
      render,
    })(),
  };
}

export {
  EventStoreProvider,
  useModuleMutation,
  useStoreClient,
  useModuleSelector,
};
