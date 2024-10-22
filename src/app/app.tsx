import { EventStoreProvider } from '../context';
import { HomePage } from '../pages';
import { ModuleType } from 'src/context/store.types';

export const App = () => {
  return (
    <>
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
                // console.log('counter', this.counter);
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
