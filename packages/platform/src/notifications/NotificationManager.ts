export class NotificationManager {
  public sendEmail(to: string, subject: string, body: string): void {
    console.log(`NotificationManager sent email to ${to}: ${subject}`);
  }

  public sendSlackAlert(channel: string, message: string): void {
    console.log(`NotificationManager posted alert in channel ${channel}: ${message}`);
  }
}
