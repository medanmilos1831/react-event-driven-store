import { commitType, ModuleType } from '../store.types';
import { ModuleService } from './ModuleService';

export class StoreService<T> extends EventTarget {
  modules: any = {};

  constructor(modules: ModuleType<T>[]) {
    super();
    modules.forEach((item) => {
      this.modules[item.moduleName] = new ModuleService(item);
    });
  }

  private PUBLISH_EVENT_ON_COMMIT = (event: string) => {
    const customEvent = new CustomEvent(event);
    this.dispatchEvent(customEvent);
  };

  SELECTOR_CREATOR = () => {
    let self = this;
    return {
      subscriber(this: { getter: string; moduleName: string }) {
        let result = self.modules[this.moduleName].getters[this.getter].call(
          self.modules[this.moduleName].state
        );
        return result;
      },
    };
  };

  MUTATION_COMMIT = (moduleName: string) => {
    let self = this;
    return {
      mutate({ payload, commit, event }: commitType) {
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
  };
}
