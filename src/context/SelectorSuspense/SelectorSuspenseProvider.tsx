import { PropsWithChildren } from 'react';
import { SuspenseContext } from './context';
import { useModuleSelector } from '../hooks';
import { moduleSelectorType } from '../store.types';
import { SuspenseItem } from './SuspenseItem';

const SelectorSuspense = ({
  children,
  selectorConfig,
}: PropsWithChildren<{ selectorConfig: moduleSelectorType }>) => {
  const { value } = useModuleSelector(selectorConfig);
  // console.log('value', value);
  return (
    <SuspenseContext.Provider value={value}>
      <>{children}</>
    </SuspenseContext.Provider>
  );
};

SelectorSuspense.Item = SuspenseItem;

export { SelectorSuspense };
