export interface IStore extends EventTarget {
  DISPATCH: (action: { type: string; payload: any }) => any;
  GET_STATE: () => unknown;
  LISTENER: (
    selector: (state: unknown) => unknown,
    render: renderType
  ) => (() => void) | undefined;
  selectorMap: Map<renderType, any>;
}

export type renderType = React.Dispatch<React.SetStateAction<number>>;
export type selectoType = (state: unknown) => unknown;
