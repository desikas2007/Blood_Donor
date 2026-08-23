import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private connected = false;

  constructor() {
    super({ log: ["warn", "error"] });
    this.connectWithRetry();
  }

  private async connectWithRetry() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      this.connected = true;
      this.logger.log("Connected to database");
    } catch (error) {
      this.connected = false;
      this.logger.error(
        `Database NOT reachable - writes will fail until DATABASE_URL points to a live Postgres instance. Retrying in 10s... (${String(error)})`
      );
      setTimeout(() => this.connectWithRetry(), 10_000);
    }
  }

  isConnected() {
    return this.connected;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
