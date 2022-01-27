import { UtilsService } from "src/common/utils/utils.service";
import { TodoEntity } from "src/repository/todo";
import { Types } from "mongoose";

export class TodoDto {
  readonly id: Types.ObjectId;
  title: string;
  description: string;
  c_at: Date;
  u_at: Date;

  constructor(todoEntity: Partial<TodoEntity>) {
    this.id = UtilsService.stringToObjectId(todoEntity.id);
    this.title = todoEntity.title;
    this.description = todoEntity.description;
    this.c_at = new Date(todoEntity.c_at);
    this.u_at = new Date(todoEntity.u_at);
  }
}
