import { JTI_REDIS_PREFIX } from "@inspigoid/inspigo-utils-ts/lib/constant";
import { IPaginateQuery, ISortQuery } from "@inspigoid/inspigo-utils-ts/lib/interface";
import { EPrivilege } from "@inspigoid/inspigo-utils-ts/lib/type";
import { API_KEY_AUTHOR } from "../constants";
import { Types } from "mongoose";

export class UtilsService {
  static toDto<T, E>(model: new (entity: E) => T, entity: E[]): T[];
  static toDto<T, E>(model: new (entity: E) => T, entity: E): T;
  static toDto<T, E>(model: new (entity: E) => T, entity: E | E[]): T | T[] {
    if (Array.isArray(entity)) {
      return entity.map(doc => new model(doc));
    }

    return entity ? new model(entity) : null;
  }

  /**
   * generate admin for notes in db data
   * @param {String | Boolean} apiKey - apiKey status
   * @param {Number} accountId - accountid
   */
  static getAuthor(apiKey: string | boolean, accountId: number) {
    return apiKey ? API_KEY_AUTHOR : String(accountId);
  }

  /**
   * parsing date to yyyy-mm-dd format
   * @param {Date} date - iso date
   */
  static parseDate(date: Date) {
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    return `${year}-${month.length < 2 ? "0" + month : month}-${day.length < 2 ? "0" + day : day}`;
  }

  /**
   * generate sort cache key
   * @param {ISortQuery} sortQuery - sort query object
   */
  static sortCacheKey(sortQuery: ISortQuery) {
    return `sort:${Object.keys(sortQuery)[0]}:${Object.values(sortQuery)[0]}`;
  }

  /**
   * generate paginate cache key
   * @param {IPaginateQuery} paginateQuery - paginate query object
   */
  static paginateCacheKey(paginateQuery: IPaginateQuery) {
    const { limit, skip } = paginateQuery;
    return `${limit}-${skip}`;
  }

  /**
   * generate privilege cache key
   * @param {number} orgId - id organization
   * @param {boolean} isSubs - subscriber status
   */
  static privilegeCacheKey = (orgId: number, isSubs = false) => {
    const orgKey = orgId ? `:org:${orgId}` : "";
    const subsKey = isSubs ? "subs" : "nonsubs";
    return `${orgKey}:${subsKey}`;
  };

  /**
   * compare two mongodb objectId is equal or not
   * @param {ObjectID} id1 - ObjectID 1
   * @param {ObjectID} id2 - ObjectID 2
   */
  static isObjectIdEq(id1: Types.ObjectId, id2: Types.ObjectId) {
    return String(id1) === String(id2);
  }

  /**
   * transform paginate response
   * @param {Array<any>} data - array of response
   */
  static paginateResponse(data: any[]) {
    return {
      count: data.length,
      results: data
    };
  }

  /**
   * slice array depend on pagination query
   * @param {Array<any>} data - array of response
   * @param {PaginateQuery} paginationQuery - object of paginate query
   */
  static paginateArray(data: any[], paginateQuery: IPaginateQuery) {
    const { limit, skip } = paginateQuery;
    return data.slice(skip, (skip || 0) + (limit || data.length));
  }

  /**
   * convert string to objectId
   * if its ObjectId it will not convert
   * @param {string | ObjectID} value - ObjectId or string
   */
  static stringToObjectId(v: string | Types.ObjectId) {
    return typeof v === "string" ? new Types.ObjectId(v) : v;
  }

  /**
   * generate redis jwt id key
   * @param {string} id - account id
   * @param {string} origin - origin resource
   */
  static generateJWTIdKey(id: number, origin: string) {
    return `${JTI_REDIS_PREFIX}:${id}:${origin}`;
  }

  /**
   * check is user authorized to access data
   * @param {string} id - account id
   * @param {Array<number>} data - privilege.data
   * @param {number} orgId - organization id
   * @param {boolean} isSubs - subscriber status
   */
  static isUserAuthorize(type: string, data: number[], orgId: number, isSubs: boolean) {
    if (type === EPrivilege.SUBSCRIBER && !isSubs) {
      return false;
    }
    if (type === EPrivilege.SPECIFIC || (type === EPrivilege.BRANDED && orgId)) {
      return data.indexOf(orgId) >= 0;
    }
    return true;
  }

  /**
   * custom joi validation callback for objectId
   * see joi custom validation docs
   * @param {ObjectID} value - value from body
   * @param {any} helpers - joi helpers
   */
  static joiIsObjectId(value: string, helpers: any): Types.ObjectId {
    try {
      const objectId = new Types.ObjectId(value);
      return objectId;
    } catch (error) {
      return helpers.message("Invalid Object Id Format");
    }
  }
}
