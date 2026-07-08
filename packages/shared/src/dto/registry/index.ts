export interface RegisterComponentRequest {
  id: string;
  version: string;
  category: string;
  manifest: any;
}

export interface RegisterComponentResponse {
  success: boolean;
  registeredId: string;
}
