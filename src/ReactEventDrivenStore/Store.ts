class Store {
  private state: any;
  private reducer: any;
  constructor(state: any, reducer: any) {
    this.state = state;
    this.reducer = reducer;
  }

  dispatch = (obj: { payload: any; type: string }, hub: any) => {
    this.state = this.reducer(this.state, obj);
    hub();
  };

  getState = () => {
    return this.state;
  };
}

export { Store };
