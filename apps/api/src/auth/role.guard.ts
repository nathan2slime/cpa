import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, Session, User } from '@prisma/client';

import { Roles } from '~/auth/auth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler()) as Role[];

    if (roles) {
      const req = context.switchToHttp().getRequest();
      const session = req.user as Session & { user: User };

      return (
        roles.filter((role) => session.user.roles.includes(role)).length ==
        roles.length
      );
    }

    return true;
  }
}
