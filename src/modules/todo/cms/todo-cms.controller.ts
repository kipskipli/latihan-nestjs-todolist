import { IPaginateQuery, ISortQuery } from "@inspigoid/inspigo-utils-ts/lib/interface";
import { AppResponse } from "@inspigoid/inspigo-utils-ts/lib/transformer";
import { ELoginOrigin } from "@inspigoid/inspigo-utils-ts/lib/type";
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { Request } from "express";
import { JwtOrServerKeyAuthGuard, OriginGuard } from "src/common/auth/guard";
import { InspigoJwtService } from "src/common/auth/inspigo-jwt.service";
import { TODO_SORT } from "src/common/constants";
import { Origin } from "src/common/decorator";
import {
  PaginationQueryValidationPipe,
  ParseObjectIdPipe,
  SortQueryValidationPipe
} from "src/common/pipe";
import { UtilsService } from "src/common/utils/utils.service";
import { CreateTodoDto } from "../dto";
import { TodoValidationPipe } from "../pipe";
import { TodoCmsService } from "./todo-cms.service";
import { Types } from "mongoose";

@Controller("cms/todos")
export class TodoCmsController {
  constructor(
    private readonly jwtService: InspigoJwtService,
    private readonly todoCmsService: TodoCmsService
  ) {}

  @Post()
  @UseGuards(JwtOrServerKeyAuthGuard, OriginGuard)
  @Origin(ELoginOrigin.CMS)
  async create(@Req() req: Request, @Body(TodoValidationPipe) createTodoDto: CreateTodoDto) {
    const { apiKey, id: accountId } = req.user;
    const admin = UtilsService.getAuthor(apiKey, accountId);
    const response = await this.todoCmsService.create(createTodoDto, admin);
    const newJwt = apiKey ? null : await this.jwtService.sign(req.user);
    return AppResponse.ok(response, { access: newJwt });
  }

  @Get()
  @UseGuards(JwtOrServerKeyAuthGuard, OriginGuard)
  @Origin(ELoginOrigin.CMS)
  async findAll(
    @Req() req: Request,
    @Query(PaginationQueryValidationPipe) paginateQuery: IPaginateQuery,
    @Query("sort", new SortQueryValidationPipe(TODO_SORT))
    sortQuery: ISortQuery
  ) {
    const { apiKey } = req.user;
    const response = await this.todoCmsService.findAll(paginateQuery, sortQuery);
    const newJwt = apiKey ? null : await this.jwtService.sign(req.user);
    return AppResponse.ok(UtilsService.paginateResponse(response), { access: newJwt });
  }

  @Get(":id")
  @UseGuards(JwtOrServerKeyAuthGuard, OriginGuard)
  @Origin(ELoginOrigin.CMS)
  async findById(@Req() req: Request, @Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    const { apiKey } = req.user;
    const response = await this.todoCmsService.findById(id);
    if (!response) {
      throw new NotFoundException();
    }
    const newJwt = apiKey ? null : await this.jwtService.sign(req.user);
    return AppResponse.ok(response, { access: newJwt });
  }
}
