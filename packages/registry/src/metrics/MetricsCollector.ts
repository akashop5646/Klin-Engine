export class MetricsCollector {
  lookupsCount = 0;
  registrationsCount = 0;
  cacheHitsCount = 0;
  cacheMissesCount = 0;

  recordLookup(cacheHit: boolean) {
    this.lookupsCount++;
    if (cacheHit) {
      this.cacheHitsCount++;
    } else {
      this.cacheMissesCount++;
    }
  }

  recordRegistration() {
    this.registrationsCount++;
  }
}
