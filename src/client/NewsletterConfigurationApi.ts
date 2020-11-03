import axios from "axios";

const create = () =>
  axios
    .post("/api/create-newsletter-configuration")
    .then((response) => response.data);

export const NewsletterConfigurationApi = { create };
