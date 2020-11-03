import { AxiosInstance } from "axios";

import { NewsletterConfiguration } from "@/server/models/NewsletterConfiguration";
import { NewsletterConfigurationPort } from "@/server/NewsletterConfigurationPort";

interface Dependencies {
  http: AxiosInstance;
}

export class NewsletterConfigurationAdapter
  implements NewsletterConfigurationPort {
  private http;

  constructor({ http }: Dependencies) {
    this.http = http;
  }

  async create(): Promise<NewsletterConfiguration> {
    const response = await this.http.post<NewsletterConfiguration>(
      "/api/v1/newsletter-configuration"
    );

    return response.data;
  }
}
