export const state = {
  fname: 'milos',
  age: 10,
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'update_fname':
      state = {
        ...state,
        fname: action.payload,
      };
      return state;

    default:
      return state;
  }
};
