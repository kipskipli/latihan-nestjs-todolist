import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JWTConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>("jwt.secret");
  }

  get ttl(): string {
    return this.configService.get<string>("jwt.ttl");
  }

  get issuer(): string {
    return this.configService.get<string>("jwt.issuer");
  }
}
