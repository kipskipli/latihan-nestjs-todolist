import { MONGO_GAMIFICATION_DB_CONNECTION_NAME } from "@inspigoid/inspigo-utils-ts/lib/constant";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BarEntity, BarSchema } from "./bar.entity";
import { BarRepository } from "./bar.repository";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: BarEntity.name, schema: BarSchema }],
      MONGO_GAMIFICATION_DB_CONNECTION_NAME
    )
  ],
  providers: [BarRepository],
  exports: [MongooseModule, BarRepository]
})
export class BarRepositoryModule {}
