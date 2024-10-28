import { SomeComponentTwo } from '../components/SomeComponentTwo';
import { SomeComponent } from '../components';
import { useModuleMutation } from '../context';
export const HomePage = () => {
  console.log('HomePage');
  const { mutate } = useModuleMutation('counter');
  const incAge = () => {
    mutate({
      payload: 1,
      event: 'INC_AGE',
      commit: 'inc',
    });
  };
  return (
    <>
      <button onClick={incAge}>inc age</button>
      {/* <button onClick={() => setCounter((prev) => prev + 1)}>
        counter inc {couter}
      </button> */}
      <SomeComponent />
      <SomeComponentTwo />
    </>
  );
};
