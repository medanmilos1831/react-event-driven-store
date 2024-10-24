import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { StoreContext } from '../context';

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

export { useModuleSelector };
