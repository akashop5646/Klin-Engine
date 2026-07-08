export class ThemeDiff {
  compare(oldTheme: any, newTheme: any): string[] {
    const changedKeys: string[] = [];

    const diffObject = (oldObj: any, newObj: any, path: string) => {
      if (!oldObj || !newObj) return;
      Object.keys(newObj).forEach((key) => {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof newObj[key] === "object") {
          diffObject(oldObj[key], newObj[key], fullPath);
        } else if (oldObj[key] !== newObj[key]) {
          changedKeys.push(fullPath);
        }
      });
    };

    diffObject(oldTheme, newTheme, "");
    return changedKeys;
  }
}
