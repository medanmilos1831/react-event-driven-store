import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IStore } from './store.types';
import { StoreService } from './StoreService';

const StoreContext = createContext<{ store: IStore } | undefined>(undefined);
const StoreProvider = ({
  children,
  store,
}: PropsWithChildren<{ store: any }>) => {
  const [storeSerivce, _] = useState<IStore>(new StoreService(store));
  return (
    <StoreContext.Provider
      value={{
        store: storeSerivce,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStoreClient = () => {
  const ctx = useContext(StoreContext)!;
  return ctx;
};

const useDispatch = () => {
  const ctx = useContext(StoreContext)!;
  return ctx.store.DISPATCH;
};

function useSelector<T>(callback: any, dep: string[]) {
  const ctx = useContext(StoreContext)!;

  const [_, render] = useState<number>(0);
  let selector = useRef<any>(null);
  if (!selector.current) {
    selector.current = ctx.store.LISTENER(callback, render);
  }

  // EVENT REGISTRATION
  useEffect(() => {
    dep.forEach((eventName: string) => {
      ctx.store.addEventListener(eventName, selector.current);
    });
    return () => {
      dep.forEach((eventName: string) => {
        ctx.store.removeEventListener(eventName, selector.current);
      });
    };
  }, []);
  // END :: EVENT REGISTRATION
  return {
    value: ctx.store.selectorMap.get(render),
    getState: ctx.store.GET_STATE(),
  };
}

const combineReducer = (param: { [key: string]: any }) => {
  const rootState = (() => {
    let rootState: { [key: string]: any } = {};
    Object.entries(param).forEach(([key, _]) => {
      rootState[key] = param[key](undefined, {});
    });
    return rootState;
  })();
  return {
    rootState,
    reducer: (state = rootState, action: any) => {
      Object.entries(param).forEach(([key, _]) => {
        state = {
          ...state,
          [key]: param[key](state[key], action, rootState),
        };
      });
      return state;
    },
  };
};

export {
  combineReducer,
  StoreProvider,
  useDispatch,
  useSelector,
  useStoreClient,
};