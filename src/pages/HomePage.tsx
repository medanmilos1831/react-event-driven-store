import { useDispatch, useSelector } from '../context';
export const HomePage = () => {
  const dispatch = useDispatch();
  const { value } = useSelector(
    (state: any) => {
      return {
        personAge: state.age,
      };
    },
    ['INC_AGE']
  );
  const incAge = () => {
    dispatch({
      type: 'INC_AGE',
      payload: 1,
    });
  };

  return (
    <div>
      <h1>HomePage {value.personAge}</h1>
      <button onClick={incAge}>inc age</button>
    </div>
  );
};
