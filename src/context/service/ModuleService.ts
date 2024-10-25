import { ModuleType } from '../store.types';

class ModuleService {
  moduleName!: string;
  state: ModuleType['state'];
  mutation!: ModuleType['mutation'];
  getters!: ModuleType['getters'];
  constructor({ moduleName, mutation, getters, state }: ModuleType) {
    this.moduleName = moduleName;
    this.state = state;
    this.mutation = mutation;
    this.getters = getters;
  }
}

export { ModuleService };
