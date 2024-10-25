import { createContext } from 'react';
import { StoreService } from './service';

const StoreContext = createContext<StoreService | undefined>(undefined);

export { StoreContext };
