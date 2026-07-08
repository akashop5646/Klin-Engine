import { PatchOperation } from "./DiffEngine";

export class PatchEngine {
  public applyPatches(patches: PatchOperation[]): void {
    patches.forEach((p) => {
      console.log(`Patch applied: ${p.type} on target node: ${p.targetNode.type}`);
    });
  }
}
