import { SomeComponentTwo } from '../components/SomeComponentTwo';
import { SomeComponent } from '../components';
import { SelectorSuspense, useDispatch, useSelector } from '../context';
export const HomePage = () => {
  const dispatch = useDispatch();
  const incAge = () => {
    dispatch({
      type: 'INC_AGE',
      payload: 1,
    });
  };

  return (
    <SelectorSuspense
      options={{
        events: ['INC_AGE'],
        selector: (state: any) => {
          return {
            personAge: state.age,
          };
        },
      }}
    >
      <div>
        <div>
          <SomeComponent />
        </div>
        <SelectorSuspense.Item>
          <SomeComponentTwo />
        </SelectorSuspense.Item>
        <button onClick={incAge}>inc age</button>
      </div>
    </SelectorSuspense>
  );
};
