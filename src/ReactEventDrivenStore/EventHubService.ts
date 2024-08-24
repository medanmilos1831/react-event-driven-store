export class EventHubService extends EventTarget {
  constructor() {
    super();
  }

  fireEvent(eventName: string) {
    this.dispatchEvent(new CustomEvent(eventName));
  }
}
