import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ExtractJwt, Strategy } from "passport-jwt";

import { jwtConstants } from "../constants/jwt.constant";

import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate({ id }: { id: string }) {
        const user = await this.authService.findUser(id);

        if (!user) {
            throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN);
        }

        return user;
    }
}
