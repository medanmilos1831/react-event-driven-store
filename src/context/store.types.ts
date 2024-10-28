export interface IStore extends EventTarget {
  SELECTOR_FACTORY: SELECTOR_FACTORY;
  MUTATION_COMMIT: MUTATION_COMMIT;
}

export type SELECTOR_FACTORY<S = any> = () => {
  subscriber(this: Omit<moduleSelectorType, 'commit'>): S;
};

type MUTATION_COMMIT = () => {
  mutate(params: commitType): void;
};

export type moduleSelectorType = {
  getterName: string;
  commit: string[];
  moduleName: string;
};

export type selectorCallbackType<T = unknown> = (s: any) => T;

export type commitType = {
  payload: any;
  commit: string;
  event?: string;
};

export interface ModuleType<T = unknown> {
  moduleName: string;
  state: T;
  mutation?: { [key: string]: (this: T, args: any) => void };
  getters?: { [key: string]: (this: T) => any } | undefined;
}
