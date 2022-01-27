import { RabbitMQConfig, RabbitMQExchangeConfig } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ETodoEventTriggered } from "src/common/enum";
import { AppConfigService } from "./app-config.service";

@Injectable()
export class RabbitMQConfigService extends AppConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  get options(): RabbitMQConfig {
    return {
      uri: super.getString("RABBITMQ_URI"),
      exchanges: this.exchanges
    };
  }

  get exchanges(): RabbitMQExchangeConfig[] {
    return [
      {
        name: ETodoEventTriggered.EXCHANGE,
        type: ETodoEventTriggered.TYPE
      }
    ];
  }

  get defaultAttemp(): number {
    return super.getNumber("RABBITMQ_DEFAULT_ATTEMP");
  }
}
