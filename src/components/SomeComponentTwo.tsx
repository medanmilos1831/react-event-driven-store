import { useModuleSelector, useOnEvent } from '../context';

const SomeComponentTwo = () => {
  useOnEvent('INC', (data) => {
    console.log('ON EVENT', data);
  });
  const { value } = useModuleSelector({
    moduleName: 'counter',
    getterName: 'getCounter',
    updateOnEvents: ['INC'],
  });
  // console.log('*******RENDER********', value);
  return <>SomeComponentTwo</>;
};

export { SomeComponentTwo };
