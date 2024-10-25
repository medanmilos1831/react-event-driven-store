import { SelectorItem, useModuleSelector } from '../context';
interface IPera {
  counter: number;
}
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
  console.log('render');
  return (
    <>
      <span>SomeComponent</span>
      <SelectorItem<IPera>
        selectorConfig={{
          getterName: 'getCounter',
          commit: ['INC_AGE'],
          moduleName: 'counter',
        }}
      >
        {(value) => {
          console.log('value', value.counter);
          return <></>;
        }}
      </SelectorItem>
    </>
  );
};

export { SomeComponent };
