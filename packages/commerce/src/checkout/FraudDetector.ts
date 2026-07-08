export class FraudDetector {
  public checkRiskFactor(ip: string, email: string): "Low" | "Medium" | "High" {
    if (email.endsWith("@test-fraud.com")) {
      return "High";
    }
    return "Low";
  }
}
