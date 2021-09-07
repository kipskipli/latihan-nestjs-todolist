import { LoginOriginEnum } from "@inspigoid/inspigo-utils-ts/lib/type";
import { SetMetadata } from "@nestjs/common";

export const Origin = (...origin: LoginOriginEnum[]) =>
  SetMetadata("origin", origin);
