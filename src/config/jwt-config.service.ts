import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { AppConfigService } from "./app-config.service";

@Injectable()
export class JWTConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get options(): JwtModuleOptions {
    return {
      secret: super.getString("JWT_SECRET"),
      signOptions: {
        algorithm: "HS256",
        issuer: super.getString("JWT_ISSUER"),
        expiresIn: super.getString("JWT_TTL")
      }
    };
  }
}
