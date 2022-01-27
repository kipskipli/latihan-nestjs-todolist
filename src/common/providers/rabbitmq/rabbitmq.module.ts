import { Module } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { MessagingService } from "./rabbitmq.service";
import { RabbitMQConfigService } from "src/config/rabbitmq-config.service";

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [RabbitMQConfigService],
      useFactory: async (config: RabbitMQConfigService) => config.options
    })
  ],
  providers: [MessagingService],
  exports: [RabbitMQModule, MessagingService]
})
export class RabbitMQProvider {}
