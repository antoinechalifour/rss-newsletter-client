import { authenticated } from "@/server/application/api";
import { NewsletterConfigurationPort } from "@/server/NewsletterConfigurationPort";

const createNewsletterConfigurationHandler = authenticated(
  async (req, res, container) => {
    const newsletterConfigurationPort = container.resolve<
      NewsletterConfigurationPort
    >("newsletterConfigurationPort");

    res.json(await newsletterConfigurationPort.create());
  }
);

export default createNewsletterConfigurationHandler;
