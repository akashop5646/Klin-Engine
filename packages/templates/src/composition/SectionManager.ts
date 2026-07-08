import { LayoutNode } from "./LayoutTree";

export class SectionManager {
  private sections: LayoutNode[] = [];

  constructor(sections: LayoutNode[] = []) {
    this.sections = sections;
  }

  getSections(): LayoutNode[] {
    return this.sections;
  }

  insertSection(index: number, section: LayoutNode) {
    this.sections.splice(index, 0, section);
  }

  moveSection(fromIndex: number, toIndex: number) {
    const [section] = this.sections.splice(fromIndex, 1);
    if (section) {
      this.sections.splice(toIndex, 0, section);
    }
  }

  deleteSection(id: string) {
    this.sections = this.sections.filter((s) => s.id !== id);
  }
}
