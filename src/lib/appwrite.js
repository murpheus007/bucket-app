import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;
export const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const postersCollectionId = import.meta.env.VITE_APPWRITE_POSTERS_COLLECTION_ID;