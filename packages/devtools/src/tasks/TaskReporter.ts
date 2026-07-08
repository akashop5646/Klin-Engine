import { Task } from "./Task";

export class TaskReporter {
  public report(tasks: Task[]): void {
    console.log("\n[Task Summary Report]");
    for (const task of tasks) {
      const icon = task.status === "Success" ? "✔" : task.status === "Failed" ? "✘" : "○";
      console.log(`${icon} ${task.name.padEnd(20)} [${task.status}]`);
    }
  }
}
