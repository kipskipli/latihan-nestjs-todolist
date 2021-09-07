import { PipeTransform, Injectable } from "@nestjs/common";
import { BadRequestException } from "../exceptions";
import { ISortQuery } from "@inspigoid/inspigo-utils-ts/lib/interface";

@Injectable()
export class SortQueryValidationPipe implements PipeTransform<unknown> {
  constructor(private readonly sortObj: Record<string, ISortQuery>) {}
  transform(value: string): ISortQuery {
    if (value && typeof value !== "string") {
      throw new BadRequestException({ sort: ["Invalid Sort Option"] });
    }
    const sortOption = this.sortObj[value];
    if (!sortOption) {
      return { u_at: -1 };
    }
    return sortOption;
  }
}
