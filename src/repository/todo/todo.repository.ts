import { IPaginateQuery, ISortQuery } from "@inspigoid/inspigo-utils-ts/lib/interface";
import { InjectModel } from "@nestjs/mongoose";
import { ClientSession, Model, Types } from "mongoose";
import { TodoEntity } from "./todo.entity";
import { BaseRepository } from "src/common/base";
import { CreateTodoDto } from "src/modules/todo/dto";

export class TodoRepository extends BaseRepository<TodoEntity> {
  constructor(
    @InjectModel(TodoEntity.name)
    model: Model<TodoEntity>
  ) {
    super(model);
  }

  async create(createTodoDto: CreateTodoDto, admin: string) {
    return await this.model.create({ ...createTodoDto, notes: super.noteCreated(admin) });
  }

  async findAll(paginateQuery: IPaginateQuery, sortQuery: ISortQuery = { u_at: -1 }) {
    const { limit, skip } = paginateQuery;
    return await this.model.find({ deleted: false }).limit(limit).skip(skip).sort(sortQuery).exec();
  }

  async findById(id: Types.ObjectId) {
    return await this.model.findOne({ _id: id, deleted: false }).exec();
  }
}
