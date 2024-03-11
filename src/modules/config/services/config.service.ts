import { Injectable, Inject } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { EnvConfig, ConfigOptions } from "../interfaces";
import { CONFIG_OPTIONS } from "@/src/constants";

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
        const filePath = `${process.env.NODE_ENV || "development"}.env`;
        const envFile = path.resolve(__dirname, "../../../../", options.folder, filePath);
        this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    }

    get(key: string): string {
        console.log("ok");
        return this.envConfig[key];
    }
}
