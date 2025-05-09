import { Client, Account } from "node-appwrite";
import { config } from "dotenv";
config();

export function getAppwriteClient(cookies) {
  const client = new Client();
  client
    .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY) // optional, for privileged operations
    .setSelfSigned(false);

  if (cookies) {
    const cookieHeader = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
    client.setCookie(cookieHeader);
  }

  const account = new Account(client);
  return { client, account };
}
