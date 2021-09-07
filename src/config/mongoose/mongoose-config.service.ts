import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MongooseConfigService {
  constructor(private configService: ConfigService) {}

  get gamificationUri(): string {
    return this.configService.get<string>("mongo.gamification_uri");
  }

  get gamificationDbConfiguration(): any {
    return {
      uri: this.configService.get<string>("mongo.gamification_uri"),
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    };
  }
}
