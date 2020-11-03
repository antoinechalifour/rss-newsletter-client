export interface AccountPort {
  create(idToken: string): Promise<void>;
}
