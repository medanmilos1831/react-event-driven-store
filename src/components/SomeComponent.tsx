import { SelectorItem, useEmitEvent, useModuleSelector } from '../context';
interface IPera {
  counter: number;
}
const SomeComponent = () => {
  const emitEvent = useEmitEvent();
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
      <button
        onClick={() =>
          emitEvent('INC_AGE', {
            fname: 'Milos',
          })
        }
      >
        Emit event
      </button>
    </>
  );
};

export { SomeComponent };
