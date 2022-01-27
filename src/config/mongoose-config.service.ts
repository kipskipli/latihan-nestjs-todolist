import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";
import { AppConfigService } from "./app-config.service";

@Injectable()
export class MongooseConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get todoDbOptions(): MongooseModuleOptions {
    return {
      uri: super.getString("MONGO_URI_TODO_DB"),
    };
  }
}
