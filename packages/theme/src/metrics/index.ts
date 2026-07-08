export class ThemeMetricsCollector {
  compilationsCount = 0;
  switchesCount = 0;
  cacheHitsCount = 0;
  cacheMissesCount = 0;

  recordCompilation() {
    this.compilationsCount++;
  }

  recordSwitch() {
    this.switchesCount++;
  }

  recordCacheHit(hit: boolean) {
    if (hit) {
      this.cacheHitsCount++;
    } else {
      this.cacheMissesCount++;
    }
  }
}
