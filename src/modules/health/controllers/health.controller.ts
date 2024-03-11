import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Version } from "@nestjs/common";
import {
    HealthCheckService,
    HealthCheck,
    // @ts-ignore
    DiskHealthIndicator,
    // @ts-ignore
    MemoryHealthIndicator,
    // @ts-ignore
    PrismaHealthIndicator,
} from "@nestjs/terminus";

import { PrismaService } from "@modules/database/services/prisma.service";

@ApiTags("metrics")
@Controller({ path: "health", version: "1" })
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly disk: DiskHealthIndicator,
        private readonly memory: MemoryHealthIndicator,
        private readonly prismaHealth: PrismaHealthIndicator,
        private readonly prisma: PrismaService
    ) {}

    @Get("")
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.disk.checkStorage("storage", { thresholdPercent: 0.9, path: "/" }),
            () => this.memory.checkHeap("memory_heap", 200 * 1024 * 1024),
            () => this.memory.checkRSS("memory_rss", 300 * 1024 * 1024),
            () => this.prismaHealth.pingCheck("prisma", this.prisma),
        ]);
    }
}
