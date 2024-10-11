import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IStore, selectorCallbackType } from './store.types';
import { StoreService } from './StoreService';

const StoreContext = createContext<IStore | undefined>(undefined);
const StoreProvider = ({
  children,
  store,
}: PropsWithChildren<{ store: any }>) => {
  const [storeSerivce, _] = useState<IStore>(new StoreService(store));
  return (
    <StoreContext.Provider value={storeSerivce}>
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
  return ctx.DISPATCH;
};

function useSelector<T>(callback: selectorCallbackType<T>, dep: string[]) {
  const ctx = useContext(StoreContext)!;

  const [_, render] = useState<number>(0);
  let selector = useRef<any>(null);
  if (!selector.current) {
    selector.current = ctx.LISTENER<T>(callback, render);
  }

  // EVENT REGISTRATION
  useEffect(() => {
    dep.forEach((eventName: string) => {
      ctx.addEventListener(eventName, selector.current);
    });
    return () => {
      dep.forEach((eventName: string) => {
        ctx.removeEventListener(eventName, selector.current);
      });
    };
  }, []);
  // END :: EVENT REGISTRATION
  return {
    value: ctx.selectorMap.get(render) as T,
    getState: ctx.GET_STATE(),
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
