import { commitType, moduleSelectorType, ModuleType } from '../store.types';
import { MESSAGES } from './constants';
import { ErrorHandling } from './ErrorHandling';
import { LogsService } from './LogsService';
import { ModuleService } from './ModuleService';

/**
 * StoreService class manages modules, handles event publishing,
 * logging, and error handling for state management operations.
 */
export class StoreService extends EventTarget {
  /**
   * Collection of ModuleService instances keyed by module name.
   * @type {Record<string, ModuleService>}
   */
  modules: { [key: string]: ModuleService } = {};

  /**
   * LogsService instance for handling logs.
   * @type {LogsService}
   * @private
   */
  private logsService = new LogsService();

  /**
   * ErrorHandling instance for handling errors.
   * @type {ErrorHandling}
   * @private
   */
  private errorHandling = new ErrorHandling();

  /**
   * Initializes the StoreService with modules and logging settings.
   * @param {ModuleType[] | undefined} modules - Array of modules to initialize.
   * @param {boolean} logs - Determines if logging should be enabled.
   */
  constructor(modules: ModuleType[] | undefined, logs: boolean) {
    super();
    // Initialize modules, if provided, by creating ModuleService instances for each
    if (modules) {
      modules.forEach((item) => {
        this.modules[item.moduleName] = new ModuleService(item);
      });
    }
    // Enable or disable logging based on the 'logs' parameter
    this.logsService.showLogs = logs;
  }

  /**
   * Publishes a custom event with specified data.
   * @param {Object} params - Event parameters.
   * @param {string} params.eventName - Name of the event to publish.
   * @param {unknown} params.data - Data to pass with the event.
   * @param {boolean} [params.isEmitter=false] - Indicates if this is an emitter event.
   * @private
   */
  private publishEvent({
    eventName,
    data,
    isEmitter = false,
  }: {
    eventName: string;
    data: unknown;
    isEmitter: boolean;
  }) {
    // Create a custom event with optional data if it’s an emitter event
    const customEvent = new CustomEvent(eventName, {
      detail: isEmitter ? { data, isEmitter } : null,
    });
    // Dispatch the event and log it if logging is enabled
    this.dispatchEvent(customEvent);
    this.logsService.logGenerator(); // Generates a log entry
  }

  /**
   * Creates a selector factory object for accessing module states.
   * @template S
   * @returns {Object} - An object with a subscriber function.
   */
  selectorFactory<S = unknown>() {
    const self = this;
    const { warningLog } = this.errorHandling;
    return {
      /**
       * Subscribes to a module's getter, logging warnings if module or getter is not found.
       * @param {Omit<moduleSelectorType, 'updateOnEvents'>} params - Selector parameters.
       * @returns {S | undefined} - The result of the getter function, or undefined if not found.
       */
      subscriber({
        getterName,
        moduleName,
      }: Omit<moduleSelectorType, 'updateOnEvents'>) {
        // If no modules are registered, log a warning and return undefined
        if (Object.keys(self.modules).length === 0) {
          warningLog(MESSAGES.NO_MODULES_FOUND);
          return undefined;
        }
        // Check if specified module exists; if not, log a warning
        if (!self.modules[moduleName]) {
          warningLog(`${MESSAGES.MODULE_NOT_FOUND} ${moduleName}`);
          return undefined;
        }
        // Access the module's getters; if none, log a warning
        const getters = self.modules[moduleName].getters;
        if (!getters) {
          warningLog(`${MESSAGES.GETTERS_OBJECT_NOT_FOUND}`);
          return undefined;
        }
        // Check if the specified getter exists in the module; if not, log a warning
        if (!getters[getterName]) {
          warningLog(`${MESSAGES.GETTER_NOT_FOUND} ${getterName}`);
          return undefined;
        }
        // Call the getter and return its result
        const result = getters[getterName].call(self.modules[moduleName].state);
        return result as S;
      },
    };
  }

  /**
   * Provides a mutation commit interface for modifying module states.
   * @returns {Object} - An object with a mutateState function.
   */
  mutationCommit() {
    const self = this;
    const { warningLog } = this.errorHandling;
    return {
      /**
       * Commits a mutation to update a module's state and publishes an event if specified.
       * @param {commitType} params - Mutation commit parameters.
       * @returns {void | undefined} - Undefined if operation is not successful.
       */
      mutateState({ payload, commit, event, moduleName }: commitType) {
        // If no modules are registered, log a warning and return undefined
        if (Object.keys(self.modules).length === 0) {
          warningLog(MESSAGES.NO_MODULES_FOUND);
          return undefined;
        }
        // Check if the specified module has mutations; if not, log a warning
        if (!self.modules[moduleName].mutation) {
          warningLog(MESSAGES.MUTATIONS_OBJECT_NOT_FOUND);
          return;
        }
        // Check if the specified commit exists in the module's mutation; if not, log a warning
        if (!self.modules[moduleName].mutation[commit]) {
          warningLog(`${MESSAGES.MUTATION_NOT_FOUND} ${commit}`);
          return;
        }
        // Execute the mutation function on the module's state with provided payload
        self.modules[moduleName].mutation[commit].call(
          self.modules[moduleName].state,
          {
            payload,
            root: self.modules,
          }
        );
        // If an event is specified, log the event and publish it
        if (event) {
          self.logsService.addLog({
            eventName: event,
            payload,
            state: structuredClone(self.modules[moduleName].state),
          });
          self.publishEvent({
            eventName: event,
            data: undefined,
            isEmitter: false,
          });
        }
      },
    };
  }

  /**
   * Emits a custom event with specified data, marking it as an emitter event.
   * @param {string} eventName - Name of the event to emit.
   * @param {unknown} data - Data to include in the event.
   */
  emitEvent = (eventName: string, data?: unknown) => {
    // Emit an event with the 'isEmitter' flag set to true, indicating it's a custom emitter
    this.publishEvent({
      eventName,
      data: data || undefined,
      isEmitter: true,
    });
  };
}
