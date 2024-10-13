import { SelectorSuspense } from '../context';

const SomeComponent = () => {
  return (
    <>
      <h1>SomeComponent</h1>
      <br />
      <SelectorSuspense.Item>
        {(value: any) => {
          return <>{value.personAge}</>;
        }}
      </SelectorSuspense.Item>
    </>
  );
};

export { SomeComponent };
