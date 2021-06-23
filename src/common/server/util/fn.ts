import { JTI_REDIS_PREFIX } from "src/common/constant";

/**
 * generate redis jwt id key
 * @param {string} id - account id
 * @param {string} origin - origin resource
 */
export const generateJWTIdKey = (id: number, origin: string) => {
  return `${JTI_REDIS_PREFIX}:${id}:${origin}`;
};
