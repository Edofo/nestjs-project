import { Injectable, Logger, NestMiddleware, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { PrismaService } from "@modules/database/services/prisma.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: Logger
    ) {}

    async use(request: Request, _response: Response, next: () => void) {
        try {
            const { authorization: token } = request.headers;

            if (!token) {
                throw new UnauthorizedException();
            }

            const payload = jwt.verify(token, process.env.JWT_TOKEN);

            const user = await this.prisma.user.findUnique({
                where: { id: payload["id"] },
            });

            if (!user) {
                throw new NotFoundException();
            }

            request.user = user;

            next();
        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException();
        }
    }
}
