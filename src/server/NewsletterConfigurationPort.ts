import { NewsletterConfiguration } from "@/server/models/NewsletterConfiguration";

export interface NewsletterConfigurationPort {
  create(): Promise<NewsletterConfiguration>;
}
