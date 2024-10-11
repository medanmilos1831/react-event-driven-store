import { PERSON_ACTION_TYPES } from '../store/person.types';
import { useDispatch, useSelector, useStoreClient } from '../context';
import { DOG_ACTION_TYPES } from '../store/dog.types';
export const HomePage = () => {
  // console.log('render HomePage');
  const ctx = useStoreClient();
  const dispatch = useDispatch();
  const { value } = useSelector(
    (state: any) => {
      return {
        personAge: state.person.age,
        dogAge: state.dog.age,
      };
    },
    [
      PERSON_ACTION_TYPES.INC_AGE,
      PERSON_ACTION_TYPES.UPDATE_NAME,
      DOG_ACTION_TYPES.INC_AGE_DOG,
    ]
  );
  console.log('selector', value);
  const incAge = () => {
    dispatch({
      type: PERSON_ACTION_TYPES.INC_AGE,
      payload: 40,
    });
  };

  const updateName = () => {
    dispatch({
      type: PERSON_ACTION_TYPES.UPDATE_NAME,
      payload: 'Marko',
    });
  };

  const logState = () => {
    console.log('logState', ctx);
  };

  return (
    <div>
      <h1>HomePage {value.personAge}</h1>
      <h1>HomePage {value.dogAge}</h1>
      <button onClick={incAge}>inc age</button>
      <button
        onClick={() => {
          dispatch({
            type: DOG_ACTION_TYPES.INC_AGE_DOG,
            payload: 40,
          });
        }}
      >
        inc age dog
      </button>
      <button onClick={updateName}>update name</button>
      <button onClick={logState}>logState</button>
    </div>
  );
};
