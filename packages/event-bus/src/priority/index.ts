export enum Priority {
  CRITICAL = 1,
  HIGH = 2,
  NORMAL = 3,
  LOW = 4,
  BACKGROUND = 5,
}

export function priorityToString(priority: Priority): string {
  switch (priority) {
    case Priority.CRITICAL:
      return "CRITICAL";
    case Priority.HIGH:
      return "HIGH";
    case Priority.NORMAL:
      return "NORMAL";
    case Priority.LOW:
      return "LOW";
    case Priority.BACKGROUND:
      return "BACKGROUND";
    default:
      return "NORMAL";
  }
}
