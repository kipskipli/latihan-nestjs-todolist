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
    const prefix = this.getPrefix(value);
    if (!prefix) {
      return null;
    }
    const [field, _] = value.split(prefix.name);
    return sortArr.indexOf(field) >= 0 ? { [field]: prefix.value } : null;
  }

  private getPrefix(v: string) {
    if (v.endsWith("_asc")) {
      return { name: "_asc", value: 1 };
    } else if (v.endsWith("_desc")) {
      return { name: "_desc", value: -1 };
    } else {
      return null;
    }
  }
}
