import { Client, Account } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Or your self-hosted Appwrite endpoint
    .setProject('681d9ffd001a760095a3'); // Replace with your project ID

const account = new Account(client);

export { client, account };
