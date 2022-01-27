import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TODO_CONNECTION_NAME } from "src/common/constants";
import { TodoEntity, TodoRepository, TodoSchema } from ".";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoEntity.name, schema: TodoSchema }], TODO_CONNECTION_NAME)
  ],
  providers: [TodoRepository],
  exports: [MongooseModule, TodoRepository]
})
export class TodoRepositoryModule {}
