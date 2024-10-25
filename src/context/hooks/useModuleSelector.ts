import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context';
import { moduleSelectorType } from '../store.types';

function useModuleSelector<V = any>({
  getterName,
  commit,
  moduleName,
}: moduleSelectorType) {
  const ctx = useContext(StoreContext)!;
  const [_, render] = useState<number>(0);

  useEffect(() => {
    const listener = () => render((p) => ++p);
    if (commit && commit.length > 0) {
      commit.forEach((eventName: string) => {
        ctx.addEventListener(eventName, listener);
      });
    }

    return () => {
      if (commit && commit.length > 0) {
        commit.forEach((eventName: string) => {
          ctx.removeEventListener(eventName, listener);
        });
      }
    };
  }, []);
  return {
    value: ctx.SELECTOR_FACTORY<V>().subscriber.bind({
      getterName,
      moduleName,
      render,
    })(),
  };
}

export { useModuleSelector };
