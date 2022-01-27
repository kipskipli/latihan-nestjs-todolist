import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UnauthorizedException } from "src/common/exceptions";

@Injectable()
export class ServerKeyAuthGuard extends AuthGuard("api-key") {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err instanceof UnauthorizedException ? err : new UnauthorizedException();
    }
    return user;
  }
}
