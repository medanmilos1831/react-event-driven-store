import {
  createContext,
  isValidElement,
  PropsWithChildren,
  useContext,
} from 'react';
import { selectorCallbackType } from './store.types';
import { useSelector } from './StoreProvider';

/**
 * Context for providing selector suspense values.
 * @type {React.Context<any>}
 */
const SelectorSuspenseContext = createContext<any>(undefined);

/**
 * Context for providing item-specific suspense values.
 * @type {React.Context<any>}
 */
const SelectorSuspenseItemContext = createContext<any>(undefined);

/**
 * Interface for the options provided to the SelectorSuspense component.
 * @interface ISelectorSuspense
 * @property {string[]} events - Array of event names to listen for.
 * @property {selectorCallbackType} selector - The selector callback function.
 */
interface ISelectorSuspense {
  events: string[];
  selector: selectorCallbackType;
}

/**
 * Props for the Item component.
 * @typedef {Object} ItemProps
 * @property {(value: any) => JSX.Element} children - A function that receives the context value and returns a JSX element.
 */
type ItemProps = {
  children: (value: any) => JSX.Element;
};

/**
 * SelectorSuspense component that provides a value from the useSelector hook
 * to its children through the SelectorSuspenseContext.
 *
 * @param {PropsWithChildren<{ options: ISelectorSuspense }>} props - The props for the SelectorSuspense component.
 * @returns {JSX.Element} The rendered component.
 */
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

/**
 * Item component that uses the SelectorSuspenseContext to render its children.
 * If children is a valid React element, it wraps it in a SelectorSuspenseItemContext.Provider;
 * otherwise, it invokes the children function with the context value.
 *
 * @param {ItemProps} props - The props for the Item component.
 * @returns {JSX.Element} The rendered component or the result of the children function.
 */
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

/**
 * Custom hook to access the value from the SelectorSuspenseItemContext.
 *
 * @returns {any} The value from the SelectorSuspenseItemContext.
 */
const useSelectorSuspenseItem = () => {
  const selectorSuspenseItemContext = useContext(SelectorSuspenseItemContext!);
  return selectorSuspenseItemContext;
};

// Assign the Item component to the SelectorSuspense.
SelectorSuspense.Item = Item;

// Export the components and hooks for use in other parts of the application.
export { SelectorSuspense, useSelectorSuspenseItem };
