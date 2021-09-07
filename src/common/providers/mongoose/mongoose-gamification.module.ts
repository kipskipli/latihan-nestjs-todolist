import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_GAMIFICATION_DB_CONNECTION_NAME } from "@inspigoid/inspigo-utils-ts/lib/constant";
import { MongooseConfigModule } from "src/config/mongoose/mongoose-config.module";
import { MongooseConfigService } from "src/config/mongoose/mongoose-config.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: MONGO_GAMIFICATION_DB_CONNECTION_NAME,
      imports: [MongooseConfigModule],
      useFactory: async (config: MongooseConfigService) =>
        config.gamificationDbConfiguration,
      inject: [MongooseConfigService]
    })
  ],
  exports: [MongooseModule]
})
export class MongooseGamificationModule {}
