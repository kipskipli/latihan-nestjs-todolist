import { PipeTransform, Injectable } from "@nestjs/common";
import { BadRequestException } from "../exceptions";
import { ISortQuery } from "@inspigoid/inspigo-utils-ts/lib/interface";

@Injectable()
export class SortQueryValidationPipe implements PipeTransform<unknown> {
  constructor(private readonly sortArr: string[], private readonly defaultSort?: string) {}
  transform(value: string): ISortQuery {
    if (!value) {
      return this.defaultSort ? this.checkAscOrDesc(this.defaultSort, this.sortArr) : { u_at: -1 };
    }
    if (value && typeof value !== "string") {
      throw new BadRequestException({ sort: ["Invalid Sort Option"] });
    }
    return this.checkAscOrDesc(value, this.sortArr);
  }

  private checkAscOrDesc(value: string, sortArr: string[]) {
    const prefix = this.getPrefix(value);
    if (!prefix) {
      return { u_at: -1 };
    }
    const [field, _] = value.split(prefix.name);
    return sortArr.indexOf(field) >= 0 ? { [field]: prefix.value } : { u_at: -1 };
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
