import { SomeComponentTwo } from '../components/SomeComponentTwo';
import { SomeComponent } from '../components';
import {
  SelectorSuspense,
  useDispatch,
  useModuleMutation,
  useSelector,
} from '../context';
import { useContext, useEffect } from 'react';
export const HomePage = () => {
  console.log('render');
  // const dispatch = useDispatch();
  const { mutate } = useModuleMutation('counter');
  // console.log('MODULE', state);
  const incAge = () => {
    mutate({
      payload: 1,
      event: 'INC_AGE',
      commit: 'inc',
    });
    // dispatch({
    //   payload: 1,
    //   event: 'INC_AGE',
    //   handler: mutations.inc,
    // });
  };

  // const { value } = useSelector<any>(
  //   getters.getCounter,
  //   ['INC_AGE'],
  //   'counter'
  // );
  // console.log('getters', getters);
  // console.log('selector value', value);
  return (
    <>
      <button onClick={incAge}>inc age</button>
      {/* <span>{value}</span> */}
      <SomeComponent />
    </>
    // <SelectorSuspense
    //   options={{
    //     events: ['INC_AGE'],
    //     selector: (state: any) => {
    //       console.log('eeeee', state);
    //       return {
    //         personAge: state.age,
    //       };
    //     },
    //   }}
    // >
    //   <div>
    //     <div>
    //       <SomeComponent />
    //     </div>
    //     <SelectorSuspense.Item>
    //       <SomeComponentTwo />
    //     </SelectorSuspense.Item>

    //     <SelectorSuspense.Item>
    //       {(value) => {
    //         return <>{value.personAge}</>;
    //       }}
    //     </SelectorSuspense.Item>
    // <button onClick={incAge}>inc age</button>
    //   </div>
    // </SelectorSuspense>
  );
};
