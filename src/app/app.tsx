import { useState } from 'react';
import { EventStoreProvider } from '../context';
import { HomePage } from '../pages';
import { ModuleType } from 'src/context/store.types';

export const App = () => {
  const [state, setState] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setState((prev) => prev + 1);
        }}
      >
        {state}
      </button>
      <EventStoreProvider
        modules={[
          {
            moduleName: 'counter',
            state: {
              counter: 0,
            },
            mutation: {
              inc(value) {
                this.counter = this.counter + value.payload;
              },
              dec() {
                this.counter = this.counter - 1;
              },
            },
            getters: {
              getCounter() {
                return this.counter;
              },
            },
          } as ModuleType<{ counter: number }>,
        ]}
      >
        <HomePage />
      </EventStoreProvider>
    </>
  );
};
