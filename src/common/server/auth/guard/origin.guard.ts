import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ForbiddenException } from "src/common/server/response/http-exception";
@Injectable()
export class OriginGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const origin = this.reflector.get<string[]>("origin", context.getHandler());
    const user = req.user;
    if (!origin || user.apiKey) {
      return true;
    }
    const matchOrigin = origin.find((o) => o === user.origin);
    if (!matchOrigin) {
      throw new ForbiddenException();
    }
    return true;
  }
}
