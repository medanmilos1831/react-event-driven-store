import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context';
import { moduleSelectorType } from '../store.types';

function useModuleSelector<V = any>({
  getterName,
  updateOnEvents,
  moduleName,
}: moduleSelectorType) {
  const ctx = useContext(StoreContext)!;
  const [_, render] = useState<number>(0);
  const [selector, __] = useState(() => ctx.selectorFactory<V>());

  useEffect(() => {
    const listener = (e: any) => {
      if (e.detail?.isEmitter) return;
      render((p) => ++p);
    };
    if (updateOnEvents && updateOnEvents.length > 0) {
      updateOnEvents.forEach((eventName: string) => {
        ctx.addEventListener(eventName, listener);
      });
    }

    return () => {
      if (updateOnEvents && updateOnEvents.length > 0) {
        updateOnEvents.forEach((eventName: string) => {
          ctx.removeEventListener(eventName, listener);
        });
      }
    };
  }, []);
  return {
    value: selector.subscriber({ getterName, moduleName }),
  };
}

export { useModuleSelector };
