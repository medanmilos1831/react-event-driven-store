import { SelectorSuspense, useModuleSelector } from '../context';

const SomeComponent = () => {
  // const { value } = useModuleSelector<{
  //   counter: number;
  // }>({
  //   getterName: 'getCounter',
  //   commit: ['INC_AGE'],
  //   moduleName: 'counter',
  // });
  // let { counter } = value;
  // console.log('*********', counter);
  return (
    <>
      <span>SomeComponent</span>
      <SelectorSuspense
        selectorConfig={{
          getterName: 'getCounter',
          commit: ['INC_AGE'],
          moduleName: 'counter',
        }}
      >
        <SelectorSuspense.Item></SelectorSuspense.Item>
      </SelectorSuspense>
    </>
  );
};

export { SomeComponent };
