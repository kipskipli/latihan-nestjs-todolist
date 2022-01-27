import { Module } from "@nestjs/common";
import { RedisCacheModule } from "src/common/providers/redis/redis.module";
import { TodoRepositoryModule } from "src/repository/todo";
import { TodoCmsController } from "./cms/todo-cms.controller";
import { TodoCmsService } from "./cms/todo-cms.service";

@Module({
  imports: [TodoRepositoryModule, RedisCacheModule],
  providers: [TodoCmsService],
  controllers: [TodoCmsController]
})
export class TodoModule {}
