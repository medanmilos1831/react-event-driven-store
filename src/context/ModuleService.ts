import { ModuleType } from './store.types';

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
  // DISPATCH = ({ event, handler, payload, moduleName }: actionType) => {
  //   // handler.call(this.modules[moduleName].state, payload);
  //   // console.log('this', this.modules['counter'].mutation.inc);
  //   // this.modules['counter'].mutation.inc.call(
  //   //   this.modules['counter'].state,
  //   //   10
  //   // );
  //   // this.state = this.reducer(this.state, action);
  //   const customEvent = new CustomEvent(event);
  //   // this.dispatchEvent(customEvent);
  // };

  /**
   * Returns the current state.
   *
   * @returns {unknown} The current state of the store.
   */
  GET_STATE = () => {
    return this.state;
  };
}

export { ModuleService };
