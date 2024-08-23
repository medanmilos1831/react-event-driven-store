export class EventHubService extends EventTarget {
  constructor() {
    super();
  }

  fireEvent(eventName: string, detail: any) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
}
