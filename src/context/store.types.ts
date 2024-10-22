/**
 * Interface representing the store, which extends EventTarget.
 * Manages actions, state retrieval, and state listeners.
 *
 * @interface IStore
 * @extends {EventTarget}
 */
export interface IStore extends EventTarget {
  /**
   * Dispatches an action to update the store's state.
   *
   * @param {{ type: string; payload: any }} action - The action object with a type and payload.
   * @returns {any} The result of the dispatch action.
   */
  DISPATCH: (action: commitType) => void;

  /**
   * Retrieves the current state of the store.
   *
   * @returns {unknown} The current state.
   */
  GET_STATE: () => unknown;

  /**
   * Registers a listener for state changes based on the selector function.
   *
   * @template T
   * @param {selectorCallbackType<T>} selector - Function to select a part of the state.
   * @param {renderType} render - Function that triggers a re-render when state changes.
   * @returns {(() => void) | undefined} The listener function or undefined if already registered.
   */
  LISTENER: <T>(
    selector: selectorCallbackType<T>,
    render: renderType,
    moduleName: string
  ) => (() => void) | undefined;

  /**
   * Map that stores selector values associated with their render functions.
   *
   * @type {selectorMapType}
   */
  selectorMap: selectorMapType;
}

/**
 * Type representing the render function that updates a component's state.
 *
 * @typedef {React.Dispatch<React.SetStateAction<number>>} renderType
 */
export type renderType = React.Dispatch<React.SetStateAction<number>>;

/**
 * Type representing the selector function that extracts part of the state.
 *
 * @typedef {(state: unknown) => unknown} selectoType
 */
export type selectoType = (state: any) => unknown;

/**
 * Type for a callback function that selects and returns a part of the state.
 *
 * @template T
 * @typedef {(state: unknown) => T} selectorCallbackType
 */
export type selectorCallbackType<T = unknown> = (s: any) => T;

/**
 * Type representing a map that associates render functions with selector values.
 *
 * @template T
 * @typedef {Map<renderType, T>} selectorMapType
 */
export type selectorMapType<T = unknown> = Map<renderType, T>;

/**
 * Type representing an action dispatched to the store.
 *
 * @typedef {{ type: string; payload: string }} commitType
 */
export type commitType = {
  payload: any;
  commit: string;
  event?: string;
};

/**
 * Type representing a reducer function that updates the store's state.
 *
 * @typedef {(state: unknown, action: commitType | {}, root?: unknown) => unknown} reducerType
 */
export type reducerType = (
  state: unknown,
  action: commitType | {},
  root?: unknown
) => unknown;

/**
 * Interface for the options provided to the SelectorSuspense component.
 * @interface ISelectorSuspense
 * @property {string[]} events - Array of event names to listen for.
 * @property {selectorCallbackType} selector - The selector callback function.
 */
export interface ISelectorSuspense {
  events: string[];
  selector: selectorCallbackType;
}

/**
 * Props for the Item component.
 * @typedef {Object} ItemProps
 * @property {(value: any) => JSX.Element} children - A function that receives the context value and returns a JSX element.
 */
export type ItemProps<T> = { children: (value: T) => JSX.Element };

export interface ModuleType<T = unknown> {
  moduleName: string;
  state: T;
  mutation: { [key: string]: (this: T, args: any) => void };
  getters: { [key: string]: (this: T, args: any) => any };
}
