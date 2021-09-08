import { PipeTransform, Injectable } from "@nestjs/common";
import { BadRequestException } from "../exceptions";
import { ISortQuery } from "@inspigoid/inspigo-utils-ts/lib/interface";

@Injectable()
export class SortQueryValidationPipe implements PipeTransform<unknown> {
  constructor(private readonly sortArr: string[]) {}
  transform(value: string): ISortQuery {
    if (value && typeof value !== "string") {
      throw new BadRequestException({ sort: ["Invalid Sort Option"] });
    }
    const sortQuery = this.checkAscOrDesc(value, this.sortArr);
    if (!sortQuery) {
      return { u_at: -1 };
    }
    return sortQuery;
  }

  private checkAscOrDesc(value: string, sortArr: string[]) {
    let prefix = "";
    let sortValue = 0;
    if (value.endsWith("_asc")) {
      prefix = "_asc";
      sortValue = 1;
    } else if (value.endsWith("_desc")) {
      prefix = "_desc";
      sortValue = -1;
    } else {
      return null;
    }
    const [field, _] = value.split(prefix);
    return sortArr.indexOf(field) >= 0 ? { [field]: sortValue } : null;
  }
}
