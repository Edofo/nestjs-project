import { Injectable, OnModuleDestroy, OnModuleInit, Scope } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { LoggerService } from "@modules/logger/services/logger.service";

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly logger: LoggerService) {
        super();
    }

    async onModuleInit() {
        try {
            this.logger.log("Connecting to the database");
            await this.$connect();
        } catch (error) {
            this.logger.error("Error connecting to the database");
            this.logger.error(error);
            throw error;
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks() {
        process.on("beforeExit", async () => {
            await this.$disconnect();
        });
    }
}
