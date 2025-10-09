import config from '../config/config.js';
import { Client, ID, Databases, Query } from "appwrite";

class DatabaseService {
    client = new Client();
    databases;
    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, userId, status }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status
                }
            );
        } catch (error) {
            console.log(`Failed to create the Post : ${error}`)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log(`Failed to update the post: ${error}`)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug
            );
            return true;
        }
        catch (error) {
            console.log(`Failed to delete the post: ${error}`);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug
            )
        } catch (error) {
            console.log(`Failed to get the post: ${error}`);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(`Failed to get the posts: ${error}`);
            return false;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;