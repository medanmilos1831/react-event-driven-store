import { dispatchType } from './types';

class Store {
  private state: any;
  private reducer: any;
  constructor(state: any, reducer: (state: any, action: dispatchType) => any) {
    this.state = state;
    this.reducer = reducer;
  }

  dispatch = (obj: dispatchType, hub: () => void) => {
    this.state = this.reducer(this.state, obj);
    hub();
  };

  getState = () => {
    return this.state;
  };
}

export { Store };
