export class VideoRuntime {
  public renderVideoPlayer(url: string, autoPlay: boolean): string {
    return `<video src="${url}" ${autoPlay ? "autoplay muted playsinline" : "controls"}></video>`;
  }
}
