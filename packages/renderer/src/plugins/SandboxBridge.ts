export class SandboxBridge {
  public setupChannel(iframe: HTMLIFrameElement): MessageChannel {
    const channel = new MessageChannel();
    iframe.contentWindow?.postMessage("init", "*", [channel.port2]);
    return channel;
  }
}
