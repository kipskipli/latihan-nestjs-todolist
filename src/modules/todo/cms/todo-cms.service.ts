import { Injectable } from "@nestjs/common";
import { RedisCacheService } from "src/common/providers/redis/redis.service";
import { UtilsService } from "src/common/utils/utils.service";
import { RedisConfigService } from "src/config/redis-config.service";
import { TodoRepository } from "src/repository/todo";
import { CreateTodoDto, TodoDto } from "../dto";
import { TodoBaseService } from "../todo-base.service";

@Injectable()
export class TodoCmsService extends TodoBaseService {
  constructor(
    todoRepository: TodoRepository,
    redisCacheService: RedisCacheService,
    redisConfigService: RedisConfigService
  ) {
    super(todoRepository, redisCacheService, redisConfigService);
  }

  async create(createTodoDto: CreateTodoDto, admin: string) {
    const todo = await this.todoRepository.create(createTodoDto, admin);
    return UtilsService.toDto(TodoDto, todo);
  }
}
