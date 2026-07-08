export class FraudDetectionAI {
  public predictFraudRisk(email: string, cardFingerprint: string): boolean {
    return email.startsWith("bad-actor@") || cardFingerprint === "stolen_card_fp";
  }
}
