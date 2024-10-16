import { ModuleService } from './ModuleService';
import {
  actionType,
  ModuleType,
  reducerType,
  renderType,
  selectoType,
} from './store.types';

/**
 * StoreService class that extends EventTarget for managing state and actions.
 */
export class StoreService<T> extends EventTarget {
  /**
   * @private
   * @type {unknown}
   */
  private state: unknown = undefined;

  /**
   * @private
   * @type {reducerType}
   */

  /**
   * Map to store selector values.
   * @type {Map<renderType, any>}
   */
  selectorMap = new Map();
  modules: any = {};

  /**
   * Creates an instance of StoreService.
   *
   * @param {reducerType} reducer - The reducer function for handling state updates.
   */
  constructor(reducer: reducerType, modules: ModuleType<T>[]) {
    super();
    this.state = reducer(undefined, {});
    // this.modules = modules;
    modules.forEach((item) => {
      this.modules[item.moduleName] = new ModuleService(item);
      // this.modules[moduleName] = rest;
      // rest.getters;
    });
  }

  GET_MODULE = (moduleName: string) => {
    let self = this;
    return {
      mutate({ event, payload, mutation }: actionType) {
        mutation.call(self.modules[moduleName].state, {
          payload,
          root: self.modules,
        });
        if (event) {
          const customEvent = new CustomEvent(event);
          self.dispatchEvent(customEvent);
        }
        console.log('SELF', self.modules[moduleName].state);
      },
      mutations: {
        ...self.modules[moduleName].mutation,
      },
    };
  };

  // /**
  //  * Dispatches an action to update the state using the reducer.
  //  *
  //  * @param {actionType} action - The action object containing type and payload.
  //  */
  // DISPATCH = ({ event, handler, payload, moduleName }: actionType) => {
  //   handler.call(this.modules[moduleName].state, payload);
  //   // console.log('this', this.modules['counter'].mutation.inc);
  //   // this.modules['counter'].mutation.inc.call(
  //   //   this.modules['counter'].state,
  //   //   10
  //   // );
  //   // this.state = this.reducer(this.state, action);
  // const customEvent = new CustomEvent(event);
  // this.dispatchEvent(customEvent);
  // };

  // /**
  //  * Returns the current state.
  //  *
  //  * @returns {unknown} The current state of the store.
  //  */
  // GET_STATE = () => {
  //   return this.state;
  // };

  // /**
  //  * Registers a listener for state changes based on a selector function.
  //  *
  //  * @param {selectoType} selector - A function to select part of the state.
  //  * @param {renderType} render - A function to trigger a re-render when the state changes.
  //  * @returns {function|undefined} A function that checks for state updates and triggers renders.
  //  */
  // LISTENER = (
  //   selector: selectoType,
  //   render: renderType,
  //   moduleName: string
  // ) => {
  //   if (this.selectorMap.has(render)) return;
  //   let initValue = selector.call(this.modules[moduleName].state);
  //   this.selectorMap.set(render, initValue);

  //   return () => {
  //     let newSelectorValue = selector.call(this.modules[moduleName].state);
  //     if (
  //       JSON.stringify(newSelectorValue) !==
  //       JSON.stringify(this.selectorMap.get(render))
  //     ) {
  //       this.selectorMap.set(render, newSelectorValue);
  //       render((prev) => prev + 1);
  //     }
  //   };
  // };
}
