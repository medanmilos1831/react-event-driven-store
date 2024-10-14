import { SelectorSuspense } from '../context';

const SomeComponent = () => {
  return (
    <>
      <h1>SomeComponent</h1>
      <br />
      <SelectorSuspense.Item>
        {(value) => {
          return <>{value.personAge}</>;
        }}
      </SelectorSuspense.Item>
    </>
  );
};

export { SomeComponent };
