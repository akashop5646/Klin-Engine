export class ApprovalWorkflow {
  public requiresManagerApproval(amount: number): boolean {
    return amount > 5000;
  }
}
