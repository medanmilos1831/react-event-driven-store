import { ReactNode } from 'react';
import { useModuleSelector } from '../hooks';
import { moduleSelectorType } from '../store.types';

function SelectorItem<V = any>({
  children,
  selectorConfig,
}: {
  children: (value: V) => ReactNode;
  selectorConfig: moduleSelectorType;
}) {
  const { value } = useModuleSelector<V>(selectorConfig);
  return <>{children(value)}</>;
}

export { SelectorItem };
