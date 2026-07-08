export class ReactGenerator {
  public generateReactComponent(name: string, templateJson: any): string {
    return `import React from 'react';\n\nexport const ${name}: React.FC = () => {\n  return <div>${name}</div>;\n};\n`;
  }
}
