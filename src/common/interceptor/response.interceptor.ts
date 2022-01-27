import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Response } from "express";
import { SuccessResponseDto } from "@inspigoid/inspigo-utils-ts/lib/transformer";
import { isRabbitContext } from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rabbitContext = isRabbitContext(context);
    if (rabbitContext) {
      return next.handle();
    }

    return next.handle().pipe(
      map<SuccessResponseDto, any>(data => {
        context.switchToHttp().getResponse<Response>().status(data.status);
        return data.body;
      })
    );
  }
}
