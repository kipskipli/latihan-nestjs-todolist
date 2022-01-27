import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { Channel, ConsumeMessage, Options } from "amqplib";
import { RABBIT_RETRY_HEADERS } from "src/common/constants";

@Injectable()
export class MessagingService {
  constructor(protected readonly amqpConnection: AmqpConnection) {}

  protected async publish(
    exchange: string,
    routingKey: string,
    message,
    options?: Options.Publish
  ): Promise<void> {
    if (!options.headers[RABBIT_RETRY_HEADERS]) {
      options.headers[RABBIT_RETRY_HEADERS] = 0;
    }
    await this.amqpConnection.publish(exchange, routingKey, message, options);
  }

  static retryCallback(channel: Channel, msg: ConsumeMessage, error) {
    const currentRetryCount = msg.properties.headers[RABBIT_RETRY_HEADERS];
    if (currentRetryCount <= 0) {
      channel.nack(msg, false, false);
    } else {
      channel.ack(msg);
      channel.publish(msg.fields.exchange, msg.fields.routingKey, msg.content, {
        headers: {
          [RABBIT_RETRY_HEADERS]: currentRetryCount - 1
        }
      });
    }
  }
}
