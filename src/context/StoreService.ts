import {
  actionType,
  reducerType,
  renderType,
  selectoType,
} from './store.types';

/**
 * StoreService class that extends EventTarget for managing state and actions.
 */
export class StoreService extends EventTarget {
  /**
   * @private
   * @type {unknown}
   */
  private state: unknown = undefined;

  /**
   * @private
   * @type {reducerType}
   */
  private reducer!: reducerType;

  /**
   * Map to store selector values.
   * @type {Map<renderType, any>}
   */
  selectorMap = new Map();

  /**
   * Creates an instance of StoreService.
   *
   * @param {reducerType} reducer - The reducer function for handling state updates.
   */
  constructor(reducer: reducerType) {
    super();
    this.state = reducer(undefined, {});
    this.reducer = reducer;
  }

  /**
   * Dispatches an action to update the state using the reducer.
   *
   * @param {actionType} action - The action object containing type and payload.
   */
  DISPATCH = (action: actionType) => {
    this.state = this.reducer(this.state, action);
    const customEvent = new CustomEvent(action.type);
    this.dispatchEvent(customEvent);
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
