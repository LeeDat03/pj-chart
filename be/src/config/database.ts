import mongoose from "mongoose";

class Database {
  private static instance: Database;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      const mongoURI = process.env.MONGODB_URI || "";

      await mongoose.connect(mongoURI);
      this.isConnected = true;
      console.log("Connected DB");
    } catch (error) {
      console.error("Failed to connect:", error);
      this.isConnected = false;
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("Disconnected DB");
    } catch (error) {
      console.error("Error disconnected:", error);
      throw error;
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export default Database;
