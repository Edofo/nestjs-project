import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const GetUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
        throw new NotFoundException();
    }

    return request.user;
});
