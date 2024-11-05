import { commitType, moduleSelectorType, ModuleType } from '../store.types';
import { LogsService } from './LogsService';
import { ModuleService } from './ModuleService';

export class StoreService extends EventTarget {
  modules: { [key: string]: ModuleService } = {};
  private logsService = new LogsService();

  constructor(modules: ModuleType[], logs: boolean) {
    super();
    modules.forEach((item) => {
      this.modules[item.moduleName] = new ModuleService(item);
    });
    this.logsService.showLogs = logs;
  }

  private PUBLISH_EVENT({
    eventName,
    data,
    isEmitter = false,
  }: {
    eventName: string;
    data: unknown;
    isEmitter: boolean;
  }) {
    let customEvent = new CustomEvent(eventName, {
      detail: isEmitter
        ? {
            data,
            isEmitter,
          }
        : null,
    });
    this.dispatchEvent(customEvent);
    this.logsService.logGenerator();
  }

  SELECTOR_FACTORY<S = unknown>() {
    let self = this;
    return {
      subscriber({
        getterName,
        moduleName,
      }: Omit<moduleSelectorType, 'updateOnEvents'>) {
        let getters = self.modules[moduleName].getters;
        if (!getters) return;
        let result = getters[getterName].call(self.modules[moduleName].state);
        return result as S;
      },
    };
  }

  MUTATION_COMMIT() {
    let self = this;
    return {
      mutateState({ payload, commit, event, moduleName }: commitType) {
        if (!self.modules[moduleName].mutation) return;
        self.modules[moduleName].mutation[commit].call(
          self.modules[moduleName].state,
          {
            payload,
            root: self.modules,
          }
        );
        if (event) {
          self.logsService.addLog({
            eventName: event,
            payload,
            state: structuredClone(self.modules[moduleName].state),
          });
          self.PUBLISH_EVENT({
            eventName: event,
            data: undefined,
            isEmitter: false,
          });
        }
      },
    };
  }

  EMIT_EVENT = (eventName: string, data: unknown) => {
    this.PUBLISH_EVENT({
      eventName,
      data,
      isEmitter: true,
    });
  };
}
