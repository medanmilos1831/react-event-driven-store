import { useModuleSelector } from '../context';

const SomeComponent = () => {
  const selector = useModuleSelector({
    getter: 'getCounter',
    commit: ['INC_AGE'],
    moduleName: 'counter',
  });
  console.log('useModuleSelector', selector);
  return (
    <>
      <span>SomeComponent</span>
    </>
  );
};

export { SomeComponent };
