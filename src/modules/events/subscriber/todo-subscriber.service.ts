import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { MessagingService } from "src/common/providers/rabbitmq/rabbitmq.service";
import { RABBIT_RETRY_HEADERS } from "src/common/constants";
import { Injectable } from "@nestjs/common";
import { RabbitMQConfigService } from "src/config/rabbitmq-config.service";
import { ETodoEventTriggered } from "src/common/enum";

@Injectable()
export class TodoSubscriberService extends MessagingService {
  private readonly retryAttemp: number;
  constructor(
    amqpConnection: AmqpConnection,
    private readonly rabbitMqConfigService: RabbitMQConfigService
  ) {
    super(amqpConnection);
    this.retryAttemp = this.rabbitMqConfigService.defaultAttemp;
  }

  async subscribe(message: string) {
    await super.publish(ETodoEventTriggered.EXCHANGE, ETodoEventTriggered.ROUTING_KEY, message, {
      headers: {
        [RABBIT_RETRY_HEADERS]: this.retryAttemp
      }
    });
  }
}
