import { useSelector } from '../context';

const SomeComponent = () => {
  const v = useSelector(
    (state) => {
      console.log('****************************', state);
      return 32;
    },
    ['INC_AGE'],
    'counter'
  );
  // console.log('dsdshkdsjds', v);
  return (
    <>
      <span>SomeComponent</span>
    </>
  );
};

export { SomeComponent };
