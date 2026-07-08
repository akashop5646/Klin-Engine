import { ASTParser } from "./ASTParser";
import { ConverterReport } from "./ConverterReport";

export class ConvertManager {
  private _parser: ASTParser;

  constructor(parser: ASTParser) {
    this._parser = parser;
  }

  public async convertComponent(code: string): Promise<ConverterReport> {
    const node = this._parser.parse(code);
    console.log(`[ConvertManager] Converting component layout: ${node.name}`);
    return new ConverterReport([node.name], [], 1, 0);
  }
}
