import { IPaginateQuery, ISortQuery } from "@inspigoid/inspigo-utils-ts/lib/interface";
import { RedisCacheService } from "src/common/providers/redis/redis.service";
import { UtilsService } from "src/common/utils/utils.service";
import { RedisConfigService } from "src/config/redis-config.service";
import { TodoRepository } from "src/repository/todo";
import { TodoDto } from "./dto";
import { Types } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoBaseService {
  protected readonly cacheTtl: number;
  protected readonly paginationKeyPattern: string = "todo:pagination:*";

  constructor(
    protected readonly todoRepository: TodoRepository,
    protected readonly redisCacheService: RedisCacheService,
    protected readonly redisConfigService: RedisConfigService
  ) {
    this.cacheTtl = this.redisConfigService.cacheTtl.todo;
  }

  protected paginationCacheKey(paginateQuery: IPaginateQuery, sortQuery: ISortQuery) {
    const paginateKey = UtilsService.paginateCacheKey(paginateQuery);
    const sortKey = UtilsService.sortCacheKey(sortQuery);
    return `todo:pagination:${paginateKey}:${sortKey}`;
  }

  protected idCacheKey(id: Types.ObjectId) {
    return `todo:${id}`;
  }

  protected async removeCaches(id?: Types.ObjectId) {
    const idCache = id ? this.redisCacheService.del(this.idCacheKey(id)) : null;
    const pagination = this.redisCacheService.removeByPattern(this.paginationKeyPattern);
    await Promise.all([idCache, pagination]);
  }

  async findAll(paginateQuery: IPaginateQuery, sortQuery: ISortQuery) {
    const key = this.paginationCacheKey(paginateQuery, sortQuery);
    const cache: TodoDto[] = await this.redisCacheService.get(key);
    if (cache) {
      return UtilsService.toDto(TodoDto, cache);
    }
    const todos = await this.todoRepository.findAll(paginateQuery, sortQuery);
    const todosDto = UtilsService.toDto(TodoDto, todos);
    await this.redisCacheService.set(key, todosDto, this.cacheTtl);
    return todosDto;
  }

  async findById(id: Types.ObjectId) {
    const key = this.idCacheKey(id);
    const cache: TodoDto = await this.redisCacheService.get(key);
    if (cache) {
      return UtilsService.toDto(TodoDto, cache);
    }
    const todo = await this.todoRepository.findById(id);
    const todoDto = UtilsService.toDto(TodoDto, todo);
    await this.redisCacheService.set(key, todoDto, this.cacheTtl);
    return todoDto;
  }
}
