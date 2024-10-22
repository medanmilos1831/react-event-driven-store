import { ModuleService } from './ModuleService';
import { commitType, ModuleType, renderType, selectoType } from './store.types';

/**
 * StoreService class that extends EventTarget for managing state and actions.
 */
export class StoreService<T> extends EventTarget {
  /**
   * @private
   * @type {unknown}
   */

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
  constructor(modules: ModuleType<T>[]) {
    super();
    modules.forEach((item) => {
      this.modules[item.moduleName] = new ModuleService(item);
    });
  }

  private PUBLISH_EVENT_ON_COMMIT = (event: string) => {
    const customEvent = new CustomEvent(event);
    self.dispatchEvent(customEvent);
  };

  MUTATION_COMMIT = (moduleName: string) => {
    let self = this;
    return {
      mutate({ payload, commit, event }: commitType) {
        self.modules[moduleName].mutation[commit].call(
          self.modules[moduleName].state,
          {
            payload,
            root: self.modules,
          }
        );
        if (event) {
          self.PUBLISH_EVENT_ON_COMMIT(event);
        }
      },
    };
  };

  // /**
  //  * Registers a listener for state changes based on a selector function.
  //  *
  //  * @param {selectoType} selector - A function to select part of the state.
  //  * @param {renderType} render - A function to trigger a re-render when the state changes.
  //  * @returns {function|undefined} A function that checks for state updates and triggers renders.
  //  */
  LISTENER = (
    selector: selectoType,
    render: renderType,
    moduleName: string
  ) => {
    if (this.selectorMap.has(render)) return;
    let initValue = selector(this.modules[moduleName].state);

    this.selectorMap.set(render, initValue);

    return () => {
      let newSelectorValue = selector(this.modules[moduleName].state);
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
