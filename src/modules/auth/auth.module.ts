import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./services/auth.service";

import { AuthController } from "./controllers/auth.controller";

import { DatabaseModule } from "@modules/database/database.module";

import { JwtStrategy } from "./strategies/jwt.strategy";

import { jwtConstants } from "./constants/jwt.constant";

@Module({
    imports: [
        DatabaseModule,

        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
