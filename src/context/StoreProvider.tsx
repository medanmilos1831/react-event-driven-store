import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { actionType, IStore, selectorCallbackType } from './store.types';
import { StoreService } from './StoreService';

const StoreContext = createContext<IStore | undefined>(undefined);
export interface ModuleType<T = unknown> {
  moduleName: string;
  state: T;
  mutation: { [key: string]: (this: T) => void };
}
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
}: PropsWithChildren<{ store: any; modules?: ModuleType<T> }>) {
  const [storeSerivce, _] = useState<IStore>(new StoreService(store));
  return (
    <StoreContext.Provider value={storeSerivce}>
      <>
        <div>
          <button
            onClick={() => {
              modules?.mutation.inc.call(modules.state);
            }}
          >
            click me
          </button>
        </div>
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

export {
  combineReducer,
  EventStoreProvider,
  useDispatch,
  useSelector,
  useStoreClient,
};
