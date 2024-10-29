import { ModuleType } from 'src/context/store.types';
import { EventStoreProvider } from '../context';
import { HomePage } from '../pages';
interface ICounter {
  counter: number;
}
export const App = () => {
  return (
    <>
      <EventStoreProvider<[ModuleType<ICounter>]>
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
                return {
                  counter: this.counter,
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
