export class MemoryInspector {
  public inspectMemory(): void {
    const memory = process.memoryUsage();
    const heapUsedMb = Math.round(memory.heapUsed / 1024 / 1024);
    const heapTotalMb = Math.round(memory.heapTotal / 1024 / 1024);
    console.log(`[MemoryInspector] Heap status: ${heapUsedMb}MB / ${heapTotalMb}MB`);
  }
}
