import { SomeComponentTwo } from '../components/SomeComponentTwo';
import { SomeComponent } from '../components';
import { useStateMutation, useEmitEvent } from '../context';
export const HomePage = () => {
  const emit = useEmitEvent();
  const { mutateState } = useStateMutation();
  return (
    <>
      <button
        onClick={() => {
          mutateState({
            payload: 1,
            event: 'INC',
            commit: 'inc',
            moduleName: 'counter',
          });
        }}
      >
        MUTATE
      </button>
      <button
        onClick={() => {
          emit('INC', 'data koja je poslata kroz event');
        }}
      >
        event
      </button>
      <SomeComponentTwo />
      {/* <SomeComponent /> */}
    </>
  );
};
