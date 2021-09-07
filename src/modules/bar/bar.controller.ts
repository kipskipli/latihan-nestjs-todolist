import { LoginOriginEnum } from "@inspigoid/inspigo-utils-ts/lib/type";
import { Controller, Get, Req, Res, UseGuards, Param } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtOrServerKeyAuthGuard, OriginGuard } from "src/common/auth/guard";
import { InspigoJwtService } from "src/common/auth/services";
import { Origin } from "src/common/decorator";
import { ApplicationResponse } from "src/common/transformers";
import { BarService } from "./bar.service";
import { ObjectID } from "mongodb";
import { ParseObjectIdPipe } from "src/common/pipe";

@Controller("route/bar")
export class BarController {
  constructor(
    private readonly barService: BarService,
    private readonly jwtService: InspigoJwtService
  ) {}

  @Get(":id")
  @UseGuards(JwtOrServerKeyAuthGuard, OriginGuard)
  @Origin(LoginOriginEnum.CMS)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id", ParseObjectIdPipe) id: ObjectID
  ) {
    const { apiKey } = req.user;
    const response = await this.barService.findAll();
    const newJwt = apiKey ? null : await this.jwtService.sign(req.user);
    return ApplicationResponse.ok(res, response, { access: newJwt });
  }
}
