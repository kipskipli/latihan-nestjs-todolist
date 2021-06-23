import constant from "src/common/constant";

/**
 * generate redis jwt id key
 * @param {string} id - account id
 * @param {string} origin - origin resource
 */
export const generateJWTIdKey = (id: Number, origin: String) => {
	return `${constant.JTI_REDIS_PREFIX}:${id}:${origin}`;
};
