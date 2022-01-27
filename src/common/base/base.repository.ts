import { EPrivilege } from "@inspigoid/inspigo-utils-ts/lib/type";
import { Model } from "mongoose";

export class BaseRepository<T> {
  protected _privilegeTypeKey = "privilege.type";
  protected _privilegeDataKey = "privilege.data";
  constructor(protected readonly model: Model<T>) {}

  async getSession() {
    return await this.model.db.startSession();
  }

  set privilegeTypeKey(typeKey) {
    this._privilegeTypeKey = typeKey;
  }

  set privilegeDataKey(dataKey) {
    this._privilegeDataKey = dataKey;
  }

  get privilegeDataKey() {
    return this._privilegeDataKey;
  }

  get privilegeTypeKey() {
    return this._privilegeTypeKey;
  }

  protected noteCreated(admin) {
    return `created by : (${admin})`;
  }

  protected noteUpdated(admin) {
    return `updated by : (${admin})`;
  }

  protected noteRemoved(admin) {
    return `removed by : (${admin})`;
  }

  private subsQuery() {
    return { [this.privilegeTypeKey]: EPrivilege.SUBSCRIBER };
  }

  private allQuery() {
    return { [this._privilegeTypeKey]: EPrivilege.ALL };
  }

  private brandedQuery() {
    return { [this.privilegeTypeKey]: EPrivilege.BRANDED };
  }

  private specificQuery(orgId) {
    return {
      $and: [
        {
          [this.privilegeTypeKey]: {
            $in: [EPrivilege.SPECIFIC, EPrivilege.BRANDED]
          }
        },
        {
          [this._privilegeDataKey]: {
            $in: [parseInt(orgId)]
          }
        }
      ]
    };
  }

  protected generatePrivilegeQuery(orgId: number, isSubscriber = false) {
    const query = [];

    if (isSubscriber && !orgId) {
      query.push(this.subsQuery());
    }

    if (orgId) {
      query.push(this.specificQuery(orgId));
    } else {
      query.push(this.brandedQuery());
    }

    query.push(this.allQuery());

    return query;
  }

  protected privilegeTypeQuery(type: string, orgIds: number[]) {
    const query = [];

    if (type === EPrivilege.SUBSCRIBER) {
      query.push(this.subsQuery());
    }

    if (type === EPrivilege.SPECIFIC || type === EPrivilege.BRANDED) {
      const inQuery = { $in: [EPrivilege.SPECIFIC, EPrivilege.BRANDED] };
      const andQuery = [
        {
          [this.privilegeTypeKey]: type === EPrivilege.SPECIFIC ? inQuery : EPrivilege.BRANDED
        },
        { [this._privilegeDataKey]: { $all: orgIds } }
      ];
      query.push({ $and: andQuery });
    } else {
      query.push(this.brandedQuery());
    }

    query.push(this.allQuery());

    return query;
  }
}
