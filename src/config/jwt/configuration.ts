import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => ({
  secret: process.env.JWT_SECRET,
  ttl: process.env.JWT_TTL,
  issuer: process.env.JWT_ISSUER
}));
