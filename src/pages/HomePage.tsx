import { SomeComponent } from '../components';
import { useStateMutation } from '../context';
export const HomePage = () => {
  const { mutateState } = useStateMutation();
  return (
    <>
      <button
        onClick={() =>
          mutateState({
            payload: 1,
            event: 'INC',
            commit: 'inc',
            moduleName: 'counter',
          })
        }
      >
        Increment age
      </button>
      <SomeComponent />
    </>
  );
};
