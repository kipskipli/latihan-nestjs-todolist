import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TODO_CONNECTION_NAME } from "src/common/constants";
import { MongooseConfigService } from "src/config/mongoose-config.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: TODO_CONNECTION_NAME,
      useFactory: async (config: MongooseConfigService) => config.todoDbOptions,
      inject: [MongooseConfigService]
    })
  ],
  exports: [MongooseModule]
})
export class MongooseTodoModule {}
