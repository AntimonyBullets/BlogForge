import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
        try {
            const user = await this.account.create(ID.unique(), email, password, name);
            if(user) {
                return this.login({email, password});
            }
            else{
                return user;
            }
        } catch (error) {
            throw new Error(`Failed to create account: ${error.message}`);
        }
    }

    async login({email, password}){
        try{
            const loggedInUser = await this.account.createEmailPasswordSession(email, password);
            return loggedInUser;
        }
        catch(e){
            throw new Error(`Failed to login: ${e.message}`); 
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log(`Failed to get current user: ${error.message}`);
        }

        return null;
    }

    async logout(){
        try{
            const loggedOutUser = await this.account.deleteSessions();
            return loggedOutUser
        }
        catch(e){
            throw new Error(`Failed to logout: ${e.message}`);
        }
    }
}   

export const authService = new AuthService();
