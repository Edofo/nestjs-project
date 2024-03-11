import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./controllers/health.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [
        TerminusModule.forRoot({
            errorLogStyle: "pretty",
        }),
        DatabaseModule,
    ],
    controllers: [HealthController],
})
export class HealthModule {}
