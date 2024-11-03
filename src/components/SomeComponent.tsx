import { useModuleSelector } from '../context';

const SomeComponent = () => {
  const { value } = useModuleSelector({
    moduleName: 'counter',
    getterName: 'getCounter',
    updateOnEvents: ['INC'],
  });
  console.log('value', value);
  // const emitEvent = useEmitEvent();
  return <>{value.counter}</>;
};

export { SomeComponent };
