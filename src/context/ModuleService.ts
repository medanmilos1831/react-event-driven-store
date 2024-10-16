import { actionType, selectoType, renderType, ModuleType } from './store.types';

class ModuleService<T> {
  moduleName!: string;
  state: any;
  mutation: any;
  getters: any;
  selectorMap = new Map();
  constructor({ moduleName, mutation, getters, state }: ModuleType<T>) {
    Object.assign(this, { moduleName, mutation, getters, state });
  }

  /**
   * Dispatches an action to update the state using the reducer.
   *
   * @param {actionType} action - The action object containing type and payload.
   */
  DISPATCH = ({ event, handler, payload, moduleName }: actionType) => {
    // handler.call(this.modules[moduleName].state, payload);
    // console.log('this', this.modules['counter'].mutation.inc);
    // this.modules['counter'].mutation.inc.call(
    //   this.modules['counter'].state,
    //   10
    // );
    // this.state = this.reducer(this.state, action);
    const customEvent = new CustomEvent(event);
    // this.dispatchEvent(customEvent);
  };

  /**
   * Returns the current state.
   *
   * @returns {unknown} The current state of the store.
   */
  GET_STATE = () => {
    return this.state;
  };

  /**
   * Registers a listener for state changes based on a selector function.
   *
   * @param {selectoType} selector - A function to select part of the state.
   * @param {renderType} render - A function to trigger a re-render when the state changes.
   * @returns {function|undefined} A function that checks for state updates and triggers renders.
   */
  LISTENER = (
    selector: selectoType,
    render: renderType,
    moduleName: string
  ) => {
    // if (this.selectorMap.has(render)) return;
    // let initValue = selector.call(this.modules[moduleName].state);
    // this.selectorMap.set(render, initValue);
    // return () => {
    //   let newSelectorValue = selector.call(this.modules[moduleName].state);
    //   if (
    //     JSON.stringify(newSelectorValue) !==
    //     JSON.stringify(this.selectorMap.get(render))
    //   ) {
    //     this.selectorMap.set(render, newSelectorValue);
    //     render((prev) => prev + 1);
    //   }
    // };
  };
}

export { ModuleService };
