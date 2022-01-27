import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { TODO_COLLECTION } from "src/common/constants";

@Schema({
  collection: TODO_COLLECTION,
  timestamps: { createdAt: "c_at", updatedAt: "u_at" }
})
export class TodoEntity extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Date, default: Date.now })
  c_at: Date;

  @Prop({ type: Date, default: Date.now })
  u_at: Date;

  @Prop({ type: String, default: null })
  notes: string;
}

export const TodoSchema = SchemaFactory.createForClass(TodoEntity);

TodoSchema.index({ deleted: 1, title: 1, _id: 1 });
