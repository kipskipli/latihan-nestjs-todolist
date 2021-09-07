import { registerAs } from "@nestjs/config";

export default registerAs("mongo", () => ({
  gamification_uri: process.env.MONGO_URI_GAMIFICATION_DB
}));
