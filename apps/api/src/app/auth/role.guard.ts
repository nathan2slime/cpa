import { Role, Session, User } from '@cpa/database'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Roles } from '~/app/auth/auth.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler()) as Role[]
    const req = context.switchToHttp().getRequest()

    console.log('User roles:', req.user.roles);
    console.log('Required roles:', roles);

    if (roles) {
      const session = req.user as Session & { user: User }

      return roles.filter(role => session.user.roles.includes(role)).length >= 1
    }

    return true
  }
}
