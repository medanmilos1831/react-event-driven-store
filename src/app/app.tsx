import { combineReducer, EventStoreProvider } from '../context';
import { HomePage } from '../pages';

const initStatePerson = { fname: 'John', lname: 'Smit', age: 25 };
const initStateCar = { brand: 'Audi', color: 'black' };
combineReducer({
  person: (state = initStatePerson, { type, payload }: any, rootState: any) => {
    switch (type) {
      case 'INC_AGE':
        return {
          ...state,
          age: state.age + payload,
        };
      default:
        return state;
    }
  },
  car: (state = initStateCar, { type, payload }: any, rootState: any) => {
    switch (type) {
      case 'CHANGE_COLOR':
        return {
          ...state,
          color: payload,
        };
      default:
        return state;
    }
  },
});
export const App = () => {
  return (
    <>
      <EventStoreProvider
        store={(
          state = initStatePerson,
          { type, payload }: any,
          rootState: any
        ) => {
          switch (type) {
            case 'INC_AGE':
              return {
                ...state,
                age: state.age + payload,
              };
            default:
              return state;
          }
        }}
      >
        <HomePage />
      </EventStoreProvider>
    </>
  );
};
