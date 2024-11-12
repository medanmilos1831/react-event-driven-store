import { SomeComponent } from '../components';
import { useStateMutation, useEmitEvent } from '../context';
export const HomePage = () => {
  const { mutateState } = useStateMutation();
  const emit = useEmitEvent();
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
      <button
        onClick={() =>
          mutateState({
            payload: 1,
            event: 'DEc',
            commit: 'dec',
            moduleName: 'counter',
          })
        }
      >
        Decrement age
      </button>
      <button
        onClick={() => {
          emit('pera');
        }}
      >
        Emit event
      </button>
      <SomeComponent />
    </>
  );
};
