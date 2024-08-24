import { createContext } from 'react';
import { IReactEventDrivenStoreContext } from './types';

export const ReactEventDrivenStoreContext = createContext<
  IReactEventDrivenStoreContext | undefined
>(undefined);
