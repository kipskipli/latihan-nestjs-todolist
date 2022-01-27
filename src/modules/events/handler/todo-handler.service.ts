import { Nack, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { MessagingService } from "src/common/providers/rabbitmq/rabbitmq.service";
import { Injectable, UseFilters } from "@nestjs/common";
import { RMQExceptionFilter } from "src/common/exceptions";
import { ETodoEventTriggered } from "src/common/enum";

@Injectable()
export class TodoHandlerService {
  constructor() {}

  @UseFilters(new RMQExceptionFilter())
  @RabbitSubscribe({
    exchange: ETodoEventTriggered.EXCHANGE,
    queue: ETodoEventTriggered.QUEUE,
    routingKey: ETodoEventTriggered.ROUTING_KEY,
    errorHandler: MessagingService.retryCallback
  })
  async handler(msg: string) {
    try {
      console.log("rabbitmq handler running");
      console.log("message: ", msg);
      return new Nack();
    } catch (e) {
      throw e;
    }
  }
}

