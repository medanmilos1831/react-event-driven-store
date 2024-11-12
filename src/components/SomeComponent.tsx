import { useModuleSelector, useOnEvent } from '../context';

const SomeComponent = () => {
  useOnEvent('pera', (data: number) => {
    console.log('heheheheh', data);
  });
  const { value } = useModuleSelector({
    moduleName: 'counter',
    getterName: 'getCounter',
    updateOnEvents: ['INC'],
  });
  console.log('render');
  console.log('value', value);
  return <>some compoent {value}</>;
};

export { SomeComponent };
