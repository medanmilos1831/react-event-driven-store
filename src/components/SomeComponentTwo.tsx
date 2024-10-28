import { useOnEvent } from '../context';

const SomeComponentTwo = () => {
  // const { onEmit } = useEmit();
  useOnEvent('INC_AGE', (data: any) => {
    console.log('pera', data);
  });
  // onEmit(() => {}, ['INC_AGE']);
  return <>SomeComponentTwo</>;
};

export { SomeComponentTwo };
