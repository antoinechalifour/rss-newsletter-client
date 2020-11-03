import { AccountPort } from "@/server/AccountPort";

interface Dependencies {
  accountPort: AccountPort;
}

export class CreateAccount {
  private accountPort;

  constructor({ accountPort }: Dependencies) {
    this.accountPort = accountPort;
  }

  execute(idToken: string) {
    return this.accountPort.create(idToken);
  }
}
