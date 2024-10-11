import { renderType, selectoType } from './store.types';

export class StoreService extends EventTarget {
  private state: unknown = undefined;
  private reducer: any;
  selectorMap = new Map();
  constructor(reducer: any) {
    super();
    if (reducer.rootState) {
      this.state = reducer.rootState;
      this.reducer = reducer.reducer;
    } else {
      this.state = reducer(undefined, {});
      this.reducer = reducer;
    }
  }

  DISPATCH = (action: { type: string; payload: any }) => {
    this.state = this.reducer(this.state, action);
    const customEvent = new CustomEvent(action.type);
    this.dispatchEvent(customEvent);
  };

  GET_STATE = () => {
    return this.state;
  };

  LISTENER = (selector: selectoType, render: renderType) => {
    if (this.selectorMap.has(render)) return;
    let initValue = selector(this.state);
    this.selectorMap.set(render, initValue);

    return () => {
      let newSelectorValue = selector(this.state);
      if (
        JSON.stringify(newSelectorValue) !==
        JSON.stringify(this.selectorMap.get(render))
      ) {
        this.selectorMap.set(render, newSelectorValue);
        render((prev) => prev + 1);
      }
    };
  };
}
