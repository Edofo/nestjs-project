import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "./services/config.service";
import { ConfigOptions } from "./interfaces";
import { CONFIG_OPTIONS } from "@/src/constants";

@Module({})
export class ConfigModule {
    static register(options: ConfigOptions): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                ConfigService,
            ],
            exports: [ConfigService],
        };
    }
}
