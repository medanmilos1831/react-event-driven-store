import { useState } from 'react';
import { EventStoreProvider } from '../context';
import { HomePage } from '../pages';
import { ModuleType } from 'src/context/store.types';
interface ICounter {
  counter: number;
  fname: string;
}

interface IPerson {
  lname: string;
}
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
      <EventStoreProvider<[ModuleType<ICounter>, ModuleType<IPerson>]>
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
          },
          {
            moduleName: 'nesto',
            state: {
              lname: 'Milos',
            },
            mutation: {
              inc(value) {
                this.lname;
              },
            },
            getters: {
              getCounter() {
                return {
                  lname: this.lname,
                };
              },
              getPera() {},
            },
          },
        ]}
      >
        <HomePage />
      </EventStoreProvider>
    </>
  );
};
