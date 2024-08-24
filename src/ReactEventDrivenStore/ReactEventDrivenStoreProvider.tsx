import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ReactEventDrivenStoreContext } from './ReactEventDrivenStoreContext';
import { EventHubService } from './EventHubService';
import { Store } from './Store';
import { dispatchType } from './types';

const ReactEventDrivenStoreProvider = ({
  children,
  store,
}: PropsWithChildren<{ store: Store }>) => {
  return (
    <ReactEventDrivenStoreContext.Provider
      value={{
        store,
        eventHub: new EventHubService(),
      }}
    >
      {children}
    </ReactEventDrivenStoreContext.Provider>
  );
};

const useDispatch = () => {
  const ctx = useContext(ReactEventDrivenStoreContext)!;
  return (obj: dispatchType) => {
    ctx.store.dispatch(obj, () => ctx.eventHub.fireEvent(obj.type));
  };
};

const useSelector = (selector: (state: any) => any, events: string[]) => {
  const ctx = useContext(ReactEventDrivenStoreContext)!;
  const [state, setState] = useState<any>(undefined);
  const listener = useRef(() => {
    setState(() => {
      return selector(ctx.store.getState());
    });
  });
  useEffect(() => {
    events.forEach((event) => {
      ctx.eventHub.addEventListener(event, listener.current);
    });
    return () => {
      events.forEach((event) => {
        ctx.eventHub.removeEventListener(event, listener.current);
      });
    };
  }, []);
  return {
    value: Object.keys(state ?? {}).length
      ? state
      : selector(ctx.store.getState()),
  };
};

export { ReactEventDrivenStoreProvider, useDispatch, useSelector };
