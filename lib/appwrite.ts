import { Account, Client } from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // <- use env
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // <- use env

export const account = new Account(client);
