import { PipeTransform, Injectable } from "@nestjs/common";
import { BadRequestException } from "../exceptions";
import { Types } from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    try {
      const transformedObjectId: Types.ObjectId = new Types.ObjectId(value);
      return transformedObjectId;
    } catch (error) {
      throw new BadRequestException({ paramId: ["Invalid Id Format"] });
    }
  }
}
