import { commitType, moduleSelectorType, ModuleType } from '../store.types';
import { ModuleService } from './ModuleService';

export class StoreService extends EventTarget {
  modules: { [key: string]: ModuleService } = {};

  constructor(modules: ModuleType[]) {
    super();
    modules.forEach((item) => {
      this.modules[item.moduleName] = new ModuleService(item);
    });
  }

  private PUBLISH_EVENT_ON_COMMIT(event: string) {
    const customEvent = new CustomEvent(event);
    this.dispatchEvent(customEvent);
  }

  SELECTOR_FACTORY<S = unknown>() {
    let self = this;
    return {
      subscriber(this: Omit<moduleSelectorType, 'commit'>) {
        let getters = self.modules[this.moduleName].getters;
        if (!getters) return;
        let result = getters[this.getterName].call(
          self.modules[this.moduleName].state
        );
        return result as S;
      },
    };
  }

  MUTATION_COMMIT(moduleName: string) {
    let self = this;
    return {
      mutate({ payload, commit, event }: commitType) {
        if (!self.modules[moduleName].mutation) return;
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
  }
}
