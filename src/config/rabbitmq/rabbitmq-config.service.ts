import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RabbitMQConfigService {
  constructor(private configService: ConfigService) {}

  get uri(): string {
    return this.configService.get<string>("rabbitmq.uri");
  }
}
