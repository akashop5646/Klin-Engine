export class ExportScheduler {
  public scheduleExport(channelName: string, intervalMin: number): void {
    console.log(`Scheduled automatic catalog exports to ${channelName} every ${intervalMin} minutes.`);
  }
}
