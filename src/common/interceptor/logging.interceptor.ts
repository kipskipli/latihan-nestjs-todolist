import { isRabbitContext } from "@golevelup/nestjs-rabbitmq";
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { ConsumeMessage } from "amqplib";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const rabbitContext = isRabbitContext(context);
    const date = Date.now();
    if (rabbitContext) {
      const fields = context.getArgByIndex<ConsumeMessage>(1).fields;
      const exchange = fields.exchange;
      const routingKey = fields.routingKey;
      return next
        .handle()
        .pipe(
          tap(() =>
            Logger.log(
              `${exchange} ${routingKey} ${Date.now() - date}ms`,
              `${context.getClass().name}`
            )
          )
        );
    }
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const method = req.method;
    const url = req.url;
    const user = req.user ? req.user.email : "inspigoKey";
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `[${user}] - ${method} ${url} ${res.statusCode} ${Date.now() - date}ms`,
            `${context.getClass().name}`
          )
        )
      );
  }
}
