import { PERSON_ACTION_TYPES } from './person.types';

const initStatePerson = { fname: 'Milos', lname: 'Medan', age: 25 };
const reducerPerson = (
  state = initStatePerson,
  { type, payload }: any,
  root: any
) => {
  switch (type) {
    case PERSON_ACTION_TYPES.INC_AGE:
      if (state.age === 30) {
        return state;
      }
      return {
        ...state,
        age: state.age + 1,
      };
    // console.log('ssss', state);
    case PERSON_ACTION_TYPES.UPDATE_NAME:
      state.fname = payload;
      return state;
    default:
      return state;
  }
};

export { initStatePerson, reducerPerson };
