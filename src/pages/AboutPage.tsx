import { PERSON_ACTION_TYPES } from '../store/person.types';
// import { useDispatch, useSelector, useStoreClient } from '../context';
export const AboutPage = () => {
  console.log('render');
  // const ctx = useStoreClient();
  // const dispatch = useDispatch();
  // const { value } = useSelector(
  //   (state: any) => {
  //     return state.age;
  //   },
  //   [PERSON_ACTION_TYPES.INC_AGE, PERSON_ACTION_TYPES.UPDATE_NAME]
  // );
  // console.log('ctx', ctx);
  // console.log('selector', value);
  // const incAge = () => {
  //   dispatch({
  //     type: PERSON_ACTION_TYPES.INC_AGE,
  //     payload: 40,
  //   });
  // };

  // const updateName = () => {
  //   dispatch({
  //     type: PERSON_ACTION_TYPES.UPDATE_NAME,
  //     payload: 'Marko',
  //   });
  // };

  // const logState = () => {
  //   console.log('logState', ctx);
  // };

  return (
    <div>
      {/* <h1>AboutPage {value ? value : '0'}</h1>
      <button onClick={incAge}>inc age</button>
      <button onClick={updateName}>update name</button>
      <button onClick={logState}>logState</button> */}
    </div>
  );
};
