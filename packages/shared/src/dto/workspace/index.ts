export interface InviteMemberRequest {
  email: string;
  role: string;
}

export interface WorkspaceSummaryResponse {
  id: string;
  name: string;
  membersCount: number;
  projectsCount: number;
}
