import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  actionType,
  IStore,
  ModuleType,
  selectorCallbackType,
} from './store.types';
import { StoreService } from './StoreService';

const StoreContext = createContext<IStore | undefined>(undefined);
/**
 * EventStoreProvider component that wraps the app and provides a store context.
 *
 * @param {PropsWithChildren<{store: any}>} props - The children components and store object.
 * @returns {JSX.Element} The context provider with the store service.
 */
function EventStoreProvider<T = unknown>({
  children,
  store,
  modules,
}: PropsWithChildren<{ store: any; modules: any }>) {
  const [storeSerivce, _] = useState<any>(new StoreService(store, modules));
  return (
    <StoreContext.Provider value={storeSerivce}>
      <>
        <div>{children}</div>
      </>
    </StoreContext.Provider>
  );
}

/**
 * Custom hook to access the store client from the context.
 *
 * @returns {IStore} The store context value.
 */
const useStoreClient = () => {
  const ctx = useContext(StoreContext)!;
  return ctx;
};

/**
 * Custom hook to dispatch actions to the store.
 *
 * @returns {function} The dispatch function from the store context.
 */
const useDispatch = () => {
  const ctx = useContext(StoreContext)!;
  return ctx.DISPATCH;
};

/**
 * Custom hook to select a part of the store state and subscribe to updates.
 *
 * @template T
 * @param {selectorCallbackType<T>} callback - The selector callback function to extract state.
 * @param {string[]} dep - List of dependency events for updating the selector.
 * @returns {{ value: T, getState: function }} The selected state value and getState method.
 */
function useSelector<T>(
  callback: selectorCallbackType<T>,
  dep: string[],
  moduleName: string
) {
  const ctx = useContext(StoreContext)!;
  console.log('undefined', callback.name);

  const [_, render] = useState<number>(0);
  let selector = useRef<any>(null);
  if (!selector.current) {
    selector.current = ctx.LISTENER<T>(callback, render, moduleName);
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
  };
}

/**
 * Combines multiple reducers into one root reducer.
 *
 * @param {object} param - An object where each key is a reducer function.
 * @returns {function} A root reducer function handling all sub-reducers.
 */
const combineReducer = (param: { [key: string]: any }) => {
  const rootState = (() => {
    let rootState: { [key: string]: any } = {};
    Object.entries(param).forEach(([key, _]) => {
      rootState[key] = param[key](undefined, {});
    });
    return rootState;
  })();
  return (state = rootState, action: actionType) => {
    Object.entries(param).forEach(([key, _]) => {
      state = {
        ...state,
        [key]: param[key](state[key], action, rootState),
      };
    });
    return state;
  };
};

const useModule = (moduleName: string) => {
  const ctx = useContext(StoreContext) as any;
  // console.log('ctx', ctx.GET_MODULE(moduleName));
  return ctx.GET_MODULE(moduleName);
  // return {
  //   // mutations: { ...ctx.modules[moduleName].mutation },
  //   // getters: { ...ctx.modules[moduleName].getters },
  //   // dispatch: function ({ ...args }) {
  //   //   ctx.DISPATCH({
  //   //     moduleName,
  //   //     ...args,
  //   //   });
  //   // },
  // };
};

export {
  combineReducer,
  EventStoreProvider,
  useDispatch,
  useSelector,
  useStoreClient,
  useModule,
};
