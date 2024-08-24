import { EventHubService } from './EventHubService';
import { Store } from './Store';

export interface IReactEventDrivenStoreContext {
  store: Store;
  eventHub: EventHubService;
}

export type dispatchType = {
  payload: any;
  type: string;
};
