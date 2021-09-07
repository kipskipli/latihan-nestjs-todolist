import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BarEntity } from "./bar.entity";

export class BarRepository {
  constructor(
    @InjectModel(BarEntity.name)
    private readonly model: Model<BarEntity>
  ) {}

  async findAll() {
    const bar = await this.model.find();
    return bar;
  }
}
