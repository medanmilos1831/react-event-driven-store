export class LogsService {
  showLogs = false;
  logs: { eventName: string; payload: any; state: any }[] = [];

  addLog(item: { eventName: string; payload: any; state: any }) {
    if (!this.showLogs) return;
    this.logs.push(item);
  }

  logGenerator() {
    if (!this.showLogs) return;
    this.logs.forEach((i: any) => {
      console.groupCollapsed(i.eventName);
      console.table(
        [{ payload: i.payload, state: i.state }],
        ['payload', 'state']
      );
      console.groupEnd();
    });
  }
}
