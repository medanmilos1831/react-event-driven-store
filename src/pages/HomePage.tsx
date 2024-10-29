import { useModuleMutation } from '../context';
export const HomePage = () => {
  const { mutate } = useModuleMutation('counter');
  return (
    <>
      <button
        onClick={() =>
          mutate({
            payload: 1,
            event: 'INC',
            commit: 'inc',
          })
        }
      >
        Increment age
      </button>
    </>
  );
};
