import { ComponentContract } from "./component";

export interface BlockContract extends ComponentContract {
  allowedChildren: string[];
}
