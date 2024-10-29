import { useOnEvent } from '../context';

const SomeComponentTwo = () => {
  useOnEvent('EMIT_AGE', (data) => {
    console.log('on event', data);
  });
  return <></>;
};

export { SomeComponentTwo };
