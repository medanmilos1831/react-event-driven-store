import { useSelectorSuspenseItem } from '../context';

const SomeComponentTwo = () => {
  const value = useSelectorSuspenseItem();
  return (
    <>
      <h1>SomeComponentTwo {value.personAge}</h1>
    </>
  );
};

export { SomeComponentTwo };
