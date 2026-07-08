export type EventChannel =
  | "builder"
  | "registry"
  | "renderer"
  | "theme"
  | "publishing"
  | "analytics"
  | "marketplace"
  | "system";

export function getChannelFromEventName(eventName: string): EventChannel {
  const parts = eventName.split(".");
  const prefix = parts[0];
  switch (prefix) {
    case "builder":
      return "builder";
    case "registry":
      return "registry";
    case "renderer":
      return "renderer";
    case "theme":
      return "theme";
    case "project":
    case "publishing":
      return "publishing";
    case "analytics":
      return "analytics";
    case "marketplace":
      return "marketplace";
    default:
      return "system";
  }
}
