import { Client, Databases } from "appwrite";

export const DATABASE_ID = "65f65c4a79214f98e6cc";

export const COLLECTION_IDS = {
  MESSAGES: "65f65c5581f1e94c95ae",
};

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65f65a258a1bc3b660bd"); // Replace with your project ID

export const databases = new Databases(client);
