import { Module } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { EClaimRewardTriggered } from "@inspigoid/inspigo-utils-ts/lib/constant";
import { RabbitMQConfigModule } from "src/config/rabbitmq/rabbitmq-config.module";
import { RabbitMQConfigService } from "src/config/rabbitmq/rabbitmq-config.service";

@Module({
  imports: [
    RabbitMQConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [RabbitMQConfigModule],
      inject: [RabbitMQConfigService],
      useFactory: async (config: RabbitMQConfigService) => ({
        uri: config.uri,
        exchanges: [
          {
            name: EClaimRewardTriggered.EXCHANGE,
            type: EClaimRewardTriggered.TYPE
          }
        ]
      })
    })
  ],
  exports: [RabbitMQModule]
})
export class RabbitMQProvider {}
