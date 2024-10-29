import { useEmitEvent } from '../context';

const SomeComponent = () => {
  const emitEvent = useEmitEvent();
  return (
    <>
      <span>SomeComponent</span>
      <button
        onClick={() =>
          emitEvent('EMIT_AGE', {
            age: 50,
          })
        }
      >
        Emit event
      </button>
    </>
  );
};

export { SomeComponent };
