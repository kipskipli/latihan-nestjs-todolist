import { ELoginOrigin } from "@inspigoid/inspigo-utils-ts/lib/type";
import { SetMetadata } from "@nestjs/common";

export const Origin = (...origin: ELoginOrigin[]) => SetMetadata("origin", origin);
