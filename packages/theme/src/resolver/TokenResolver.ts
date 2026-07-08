export class TokenResolver {
  resolve(theme: any): any {
    const resolved: any = {
      metadata: theme.metadata,
      foundation: JSON.parse(JSON.stringify(theme.foundation)),
      semantic: {},
    };

    const getRaw = (val: string): string => {
      if (theme.foundation.colors[val]) {
        return theme.foundation.colors[val];
      }
      if (theme.foundation.fontSizes[val]) {
        return theme.foundation.fontSizes[val];
      }
      if (theme.foundation.spacing[val]) {
        return theme.foundation.spacing[val];
      }
      if (theme.foundation.radius[val]) {
        return theme.foundation.radius[val];
      }
      return val;
    };

    Object.keys(theme.semantic).forEach((category) => {
      resolved.semantic[category] = {};
      Object.keys(theme.semantic[category]).forEach((token) => {
        const val = theme.semantic[category][token];
        resolved.semantic[category][token] = getRaw(val);
      });
    });

    return resolved;
  }
}
