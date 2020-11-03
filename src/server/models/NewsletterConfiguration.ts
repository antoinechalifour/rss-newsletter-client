import { Source } from "@/server/models/Source";

export interface NewsletterConfiguration {
  id: string;
  sources: Source[];
}
