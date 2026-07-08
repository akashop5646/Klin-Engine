export interface ResourceLock {
  readonly resourceId: string;
  readonly token: string;
  readonly acquiredAt: number;
  readonly expiresAt: number;
}
