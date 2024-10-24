export interface IStore extends EventTarget {
  DISPATCH: (action: commitType) => void;

  SELECTOR_CREATOR: any;
}
export type renderType = React.Dispatch<React.SetStateAction<number>>;

export type selectoType = (state: any) => unknown;

export type selectorCallbackType<T = unknown> = (s: any) => T;

export type selectorMapType<T = unknown> = Map<renderType, T>;

export type commitType = {
  payload: any;
  commit: string;
  event?: string;
};

export interface ISelectorSuspense {
  events: string[];
  selector: selectorCallbackType;
}

export type ItemProps<T> = { children: (value: T) => JSX.Element };

export interface ModuleType<T = unknown> {
  moduleName: string;
  state: T;
  mutation: { [key: string]: (this: T, args: any) => void };
  getters: { [key: string]: (this: T, args: any) => any };
}
