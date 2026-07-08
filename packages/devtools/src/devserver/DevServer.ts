import * as http from "http";

export class DevServer {
  private _server?: http.Server;
  private _port: number;

  constructor(port: number = 3000) {
    this._port = port;
  }

  public async start(): Promise<void> {
    this._server = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Klin Dev Server Running");
    });

    return new Promise((resolve) => {
      this._server?.listen(this._port, () => {
        console.log(`Klin Dev Server started on http://localhost:${this._port}`);
        resolve();
      });
    });
  }

  public async stop(): Promise<void> {
    if (this._server) {
      return new Promise((resolve) => {
        this._server?.close(() => {
          console.log("Klin Dev Server stopped.");
          resolve();
        });
      });
    }
  }
}
