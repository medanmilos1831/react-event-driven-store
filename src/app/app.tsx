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
              fname: 'Milos',
            },
            mutation: {
              inc(value) {
                this.counter = this.counter + value.payload;
              },
              dec() {
                this.counter = this.counter - 1;
                this.fname;
              },
            },
            getters: {
              getCounter() {
                return {
                  counter: this.counter,
                };
              },
              getPera() {},
            },
          } as ModuleType<{ counter: number; fname: string }>,
        ]}
      >
        <HomePage />
      </EventStoreProvider>
    </>
  );
};
