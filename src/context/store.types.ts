export interface IStore extends EventTarget {
  selectorFactory: selectorFactoryType;
  mutationCommit: mutationCommitType;
  emitEvent: emitEventType;
}

type emitEventType = (eventName: string, data: unknown) => void;
export type selectorFactoryType<S = any> = () => {
  subscriber(this: Omit<moduleSelectorType, 'commit'>): S;
};

type mutationCommitType = () => {
  mutateState(params: commitType): void;
};

export type moduleSelectorType = {
  getterName: string;
  updateOnEvents: string[];
  moduleName: string;
};

export type selectorCallbackType<T = unknown> = (s: any) => T;

export type commitType = {
  payload: any;
  commit: string;
  event?: string;
  moduleName: string;
};

export interface ModuleType<T = unknown> {
  moduleName: string;
  state: T;
  mutation?: { [key: string]: (this: T, args: any) => void };
  getters?: { [key: string]: (this: T) => any } | undefined;
}
