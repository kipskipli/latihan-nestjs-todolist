import { Catch, ArgumentsHost, HttpException, Logger, RpcExceptionFilter } from "@nestjs/common";
import { ConsumeMessage } from "amqplib";
import { throwError } from "rxjs";
import { InternalServerErrorException } from "./internal-server-error.exception";

@Catch()
export class RMQExceptionFilter implements RpcExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const rpc = host.switchToRpc();
    const ctx = rpc.getContext<ConsumeMessage>();
    const exchange = ctx.fields.exchange;
    const routingKey = ctx.fields.routingKey;
    const attemp = ctx.properties.headers["x-retries"];
    const e =
      exception instanceof HttpException ? exception : new InternalServerErrorException(exception);
    Logger.error(
      `[${exchange}] - ${routingKey} attemp: ${attemp}`,
      `error: ${JSON.stringify(e.getResponse())}`,
      "RMQExceptionFilter"
    );
    return throwError(exception);
  }
}
