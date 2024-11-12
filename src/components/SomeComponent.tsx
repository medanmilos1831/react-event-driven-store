import { useModuleSelector, useOnEvent } from '../context';

const SomeComponent = () => {
  useOnEvent('INC', (data: number) => {
    // console.log('SOME COMPONENT', data);
  });
  // const { value } = useModuleSelector({
  //   moduleName: 'counter',
  //   getterName: 'getCounter',
  //   updateOnEvents: ['INC'],
  // });
  // console.log('render');
  // console.log('value', value);
  return <>some compoent</>;
};

export { SomeComponent };
