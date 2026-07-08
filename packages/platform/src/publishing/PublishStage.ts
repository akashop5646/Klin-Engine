export abstract class PublishStage {
  public abstract readonly name: string;
  public abstract execute(context: any): Promise<void>;
}
