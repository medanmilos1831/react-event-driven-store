import { DOG_ACTION_TYPES } from './dog.types';

const initStateDog = { dogName: 'Roki', age: 4 };
const reducerDog = (
  state = initStateDog,
  { type, payload }: any,
  root: any
) => {
  switch (type) {
    case DOG_ACTION_TYPES.INC_AGE_DOG:
      // console.log('state', state);
      // console.log('ROOT', root);
      if (state.age === 30) {
        return state;
      }
      state.age = state.age + 10;
      return state;
    case DOG_ACTION_TYPES.UPDATE_NAME_DOG:
      state.dogName = payload;
      return state;
    default:
      return state;
  }
};

export { reducerDog };
