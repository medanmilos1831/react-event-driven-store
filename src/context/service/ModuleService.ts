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
  GET_STATE = () => {
    return this.state;
  };
}

export { ModuleService };
