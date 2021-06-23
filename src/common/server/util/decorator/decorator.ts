import { SetMetadata } from "@nestjs/common";

export const Origin = (...origin: string[]) => SetMetadata("origin", origin);
