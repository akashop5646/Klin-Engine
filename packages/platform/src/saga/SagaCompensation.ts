export class SagaCompensation {
  public name: string;
  public compensate: () => Promise<void>;

  constructor(name: string, compensate: () => Promise<void>) {
    this.name = name;
    this.compensate = compensate;
  }
}
