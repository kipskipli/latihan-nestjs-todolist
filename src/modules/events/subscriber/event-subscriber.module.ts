import { Module } from "@nestjs/common";
import { RabbitMQProvider } from "src/common/providers/rabbitmq/rabbitmq.module";
import { TodoSubscriberService } from "./todo-subscriber.service";

@Module({
  imports: [RabbitMQProvider],
  providers: [TodoSubscriberService],
  exports: [TodoSubscriberService]
})
export class EventSubscriberModule {}
