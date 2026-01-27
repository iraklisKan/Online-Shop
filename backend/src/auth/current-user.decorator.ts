import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUserByContext = (ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return getCurrentUserByContext(ctx);
  },
);
