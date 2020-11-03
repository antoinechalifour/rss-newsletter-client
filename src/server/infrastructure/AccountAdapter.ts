import { AxiosInstance } from "axios";

import { AccountPort } from "@/server/AccountPort";

interface Dependencies {
  http: AxiosInstance;
}

export class AccountAdapter implements AccountPort {
  private http;

  constructor({ http }: Dependencies) {
    this.http = http;
  }

  async create(idToken: string): Promise<void> {
    await this.http.post("/api/v1/account");
  }
}
