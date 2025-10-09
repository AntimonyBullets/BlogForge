import config from '../config/config.js';
import { Client, ID, Storage, Query } from "appwrite";

class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`Failed to create the file: ${error}`);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`Failed to delete the file: ${error}`);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFileView(
            config.appwriteBucketId,
            fileId
        )
    }
}

const storageService = new StorageService();

export default storageService;