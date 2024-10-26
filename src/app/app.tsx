import { useState } from 'react';
import { EventStoreProvider } from '../context';
import { HomePage } from '../pages';
import { ModuleType } from 'src/context/store.types';
interface IZika {
  counter: number;
  fname: string;
}

interface IPera {
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
      <EventStoreProvider<[ModuleType<IZika>, ModuleType<IPera>]>
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
                // this.counter = this.counter + value.payload;
              },
              // dec() {
              //   this.counter = this.counter - 1;
              //   this.fname;
              // },
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
