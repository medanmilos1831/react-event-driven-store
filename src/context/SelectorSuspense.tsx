import {
  createContext,
  isValidElement,
  PropsWithChildren,
  useContext,
} from 'react';
import { selectorCallbackType } from './store.types';
import { useSelector } from './StoreProvider';

const SelectorSuspenseContext = createContext<any>(undefined);
const SelectorSuspenseItemContext = createContext<any>(undefined);

interface ISelectorSuspense {
  events: string[];
  selector: selectorCallbackType;
}

type ItemProps = {
  children: (value: any) => JSX.Element;
};

const SelectorSuspense = ({
  children,
  options,
}: PropsWithChildren<{ options: ISelectorSuspense }>) => {
  const { value } = useSelector(options.selector, options.events);
  return (
    <SelectorSuspenseContext.Provider value={value}>
      {children}
    </SelectorSuspenseContext.Provider>
  );
};

const Item = ({ children }: any) => {
  const selectorSuspenseContext = useContext(SelectorSuspenseContext);
  if (isValidElement(children)) {
    return (
      <SelectorSuspenseItemContext.Provider value={selectorSuspenseContext}>
        {children}
      </SelectorSuspenseItemContext.Provider>
    );
  }
  return <>{children(selectorSuspenseContext)}</>;
};

const useSelectorSuspenseItem = () => {
  const selectorSuspenseItemContext = useContext(SelectorSuspenseItemContext!);
  return selectorSuspenseItemContext;
};

SelectorSuspense.Item = Item;

export { SelectorSuspense, useSelectorSuspenseItem };
