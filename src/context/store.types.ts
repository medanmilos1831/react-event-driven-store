export interface IStore extends EventTarget {
  DISPATCH: (action: { type: string; payload: any }) => any;
  GET_STATE: () => unknown;
  LISTENER: <T>(
    selector: selectorCallbackType<T>,
    render: renderType
  ) => (() => void) | undefined;
  selectorMap: selectorMapType;
}

export type renderType = React.Dispatch<React.SetStateAction<number>>;
export type selectoType = (state: unknown) => unknown;
export type selectorCallbackType<T = unknown> = (state: unknown) => T;
export type selectorMapType<T = unknown> = Map<renderType, T>;
export type actionType = { type: string; payload: string };
export type reducerType = (
  state: unknown,
  action: actionType | {},
  root?: unknown
) => unknown;
