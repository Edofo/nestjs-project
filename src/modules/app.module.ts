import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

import { AuthModule } from "@modules/auth/auth.module";
import { ConfigModule } from "@modules/config/config.module";
import { DatabaseModule } from "@modules/database/database.module";
import { HealthModule } from "@modules/health/health.module";
import { LoggerModule } from "@modules/logger/logger.module";

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                name: "short",
                ttl: 1000,
                limit: 3,
            },
            {
                name: "medium",
                ttl: 10000,
                limit: 20,
            },
            {
                name: "long",
                ttl: 60000,
                limit: 100,
            },
        ]),
        PrometheusModule,

        LoggerModule,
        ConfigModule.register({ folder: "./config" }),
        HealthModule,
        DatabaseModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
