import { ModuleType } from '../context';

class CounterModule {
  moduleName: string = 'counter';
  state = {
    counter: 0,
  };

  public mutation = {
    inc() {
      console.log(this);
    },
  };
}

export { CounterModule };
