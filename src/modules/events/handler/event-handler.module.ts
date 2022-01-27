import { Module } from "@nestjs/common";
import { TodoHandlerService } from "./todo-handler.service";

@Module({
  providers: [TodoHandlerService],
  exports: [TodoHandlerService]
})
export class EventHandlerModule {}

