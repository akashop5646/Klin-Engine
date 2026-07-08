import { IDataProvider } from "../providers/IDataProvider";

export interface TransactionOp {
  type: "create" | "update" | "delete";
  collection: string;
  id: string;
  data?: any;
  previousData?: any;
}

export class Transaction {
  private readonly _provider: IDataProvider;
  private _ops: TransactionOp[] = [];
  private _isActive: boolean = true;

  constructor(provider: IDataProvider) {
    this._provider = provider;
  }

  public add(op: TransactionOp): void {
    if (!this._isActive) throw new Error("Transaction is no longer active");
    this._ops.push(op);
  }

  public async commit(): Promise<void> {
    if (!this._isActive) throw new Error("Transaction is no longer active");
    this._isActive = false;
    
    // Execute on provider
    await this._provider.executeTransaction(this._ops);
  }

  public async rollback(): Promise<void> {
    if (!this._isActive) throw new Error("Transaction is no longer active");
    this._isActive = false;
    
    // Revert executed operations in reverse order
    for (let i = this._ops.length - 1; i >= 0; i--) {
      const op = this._ops[i];
      if (op.type === "create") {
        await this._provider.deleteEntry(op.collection, op.id);
      } else if (op.type === "update" && op.previousData) {
        await this._provider.updateEntry(op.collection, op.id, op.previousData);
      } else if (op.type === "delete" && op.previousData) {
        await this._provider.createEntry(op.collection, op.previousData);
      }
    }
  }
}
