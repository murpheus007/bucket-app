import { ID } from 'appwrite';
import { databases, databaseId, postersCollectionId, storage, bucketId } from './appwrite.js';

export const dbBucket = {
  createDocument: async ({ data, documentId = ID.unique() }) => {
    return await databases.createDocument(
      databaseId,
      postersCollectionId,
      documentId,
      data
    );
  },

  createImage: async ({ fileId = ID.unique(), file }) => {
    return await storage.createFile(
      bucketId,
      fileId,
      file
    );
  },

  getImages: async () => {
    return await storage.listFiles(bucketId);
  },

  listDocuments: async () => {
    return databases.listDocuments(
      databaseId,
      postersCollectionId
    );
  }
};
