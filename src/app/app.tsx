import {
  ReactEventDrivenStoreProvider,
  Store,
  useDispatch,
  useSelector,
} from 'src/ReactEventDrivenStore';
import { reducer, state } from 'src/store';

const SomeComponent = () => {
  const dispatch = useDispatch();
  console.log('render');
  return (
    <>
      <div>
        <h1>SomeComponent</h1>
      </div>
      <button
        onClick={() => {
          dispatch({
            payload: 'marko',
            type: 'update_fname',
          });
        }}
      >
        marko
      </button>
      <button
        onClick={() => {
          dispatch({
            payload: 'milos',
            type: 'update_fname',
          });
        }}
      >
        milos
      </button>
      <div>
        <SomeInnerComponent />
      </div>
    </>
  );
};

const SomeInnerComponent = () => {
  const { value } = useSelector(
    (state: any) => {
      return {
        f: state.fname,
      };
    },
    ['update_fname']
  );
  console.log('*****inner*****', value);
  return (
    <>
      <h2>SomeInnerComponent</h2>
    </>
  );
};

const App = () => {
  return (
    <ReactEventDrivenStoreProvider store={new Store(state, reducer)}>
      <SomeComponent />
    </ReactEventDrivenStoreProvider>
  );
};

export { App };
