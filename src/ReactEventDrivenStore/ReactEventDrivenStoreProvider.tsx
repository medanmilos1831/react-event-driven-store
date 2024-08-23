import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ReactEventDrivenStoreContext } from './ReactEventDrivenStoreContext';
import { EventHubService } from './EventHubService';

const ReactEventDrivenStoreProvider = ({
  children,
  store,
}: PropsWithChildren<{ store: any }>) => {
  return (
    <ReactEventDrivenStoreContext.Provider
      value={{
        ...store,
        eventHub: new EventHubService(),
      }}
    >
      {children}
    </ReactEventDrivenStoreContext.Provider>
  );
};

const useDispatch = () => {
  const ctx = useContext(ReactEventDrivenStoreContext)!;
  return (obj: any) => {
    ctx.dispatch(obj, () => ctx.eventHub.fireEvent(obj.type));
  };
};

const useSelector = (selector: any, events: string[]) => {
  const ctx = useContext(ReactEventDrivenStoreContext);
  const [state, setState] = useState<any>(undefined);
  const listener = useRef(() => {
    setState(() => {
      return selector(ctx.getState());
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
    value: Object.keys(state ?? {}).length ? state : selector(ctx.getState()),
  };
};

export { ReactEventDrivenStoreProvider, useDispatch, useSelector };
