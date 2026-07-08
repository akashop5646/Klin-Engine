import { Entry } from "../entities/Entry";

export class DataMiddleware {
  private _middlewares: Array<(entry: Entry, next: () => Promise<void>) => Promise<void>> = [];

  public use(middleware: (entry: Entry, next: () => Promise<void>) => Promise<void>): void {
    this._middlewares.push(middleware);
  }

  public async execute(entry: Entry, finalAction: () => Promise<void>): Promise<void> {
    let index = -1;

    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;

      let fn = this._middlewares[i];
      if (i === this._middlewares.length) {
        await finalAction();
        return;
      }

      if (!fn) return;

      await fn(entry, () => dispatch(i + 1));
    };

    await dispatch(0);
  }
}
