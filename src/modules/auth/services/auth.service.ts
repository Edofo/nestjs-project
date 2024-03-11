import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

import { User } from "@prisma/client";

import { PrismaService } from "@modules/database/services/prisma.service";

import { RegisterDto } from "../dto/register.dto";

import LogError from "@helpers/exception/log-error.exception";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async validateUser(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            const { ...result } = user;
            return result;
        }

        return null;
    }

    async generateAccessToken(user: { id: string }) {
        try {
            const payload = { id: user.id };

            return jwt.sign(payload, process.env.JWT_TOKEN);
        } catch (error) {
            throw await LogError(error);
        }
    }

    async findUser(id: string): Promise<User> {
        try {
            const checkUser = await this.prisma.user.findUnique({
                where: { id },
            });

            if (!checkUser) {
                throw new NotFoundException("User not found");
            }

            return checkUser;
        } catch (error) {
            throw await LogError(error);
        }
    }

    async register(data: RegisterDto): Promise<User> {
        try {
            const checkUser = await this.prisma.user.findUnique({
                where: { email: data.email },
            });

            if (checkUser) {
                throw new ConflictException("Email already exists");
            }

            return await this.prisma.user.create({
                data: {
                    ...data,
                },
            });
        } catch (error) {
            throw await LogError(error);
        }
    }

    async login(data: LoginDto): Promise<User> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: data.email },
            });

            if (!user) {
                throw new NotFoundException("User not found");
            }

            return user;
        } catch (error) {
            throw await LogError(error);
        }
    }
}
