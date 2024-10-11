import { StoreProvider, combineReducer } from '../context';
import { HomePage } from '../pages';
import { reducerPerson, reducerDog } from '../store';

export const App = () => {
  return (
    <>
      <StoreProvider
        store={combineReducer({
          person: reducerPerson,
          dog: reducerDog,
        })}
      >
        <HomePage />
      </StoreProvider>
    </>
  );
};
