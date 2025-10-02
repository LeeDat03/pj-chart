import express, { Application } from "express";
import Database from "./config/database";

class Server {
  private static instance: Server;
  private app: Application;
  private port: number;

  private constructor(app: Application) {
    this.app = app;
    this.port = parseInt(process.env.PORT || "3000");
  }

  public static getInstance(app: Application): Server {
    if (!Server.instance) {
      Server.instance = new Server(app);
    }
    return Server.instance;
  }

  public async start(): Promise<void> {
    try {
      const database = Database.getInstance();
      await database.connect();

      this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
      this.setupGracefulShutdown();
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);

      try {
        const database = Database.getInstance();
        await database.disconnect();
        process.exit(0);
      } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
      }
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  }
}

export default Server;
