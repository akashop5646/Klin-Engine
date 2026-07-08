export class GithubIntegration {
  public async syncRepository(repo: string, branch: string): Promise<boolean> {
    console.log(`GithubIntegration syncing repository ${repo} on branch ${branch}...`);
    return true;
  }
}
