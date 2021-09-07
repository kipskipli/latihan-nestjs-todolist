import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  collection: "bar",
  timestamps: { createdAt: "c_at", updatedAt: "u_at" }
})
export class BarEntity extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Date, default: Date.now })
  c_at: Date;

  @Prop({ type: Date, default: Date.now })
  u_at: Date;
}

export const BarSchema = SchemaFactory.createForClass(BarEntity);
BarSchema.index({ deleted: 1, _id: 1 });
