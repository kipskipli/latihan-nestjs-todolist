import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./common/auth/auth.module";
import { LoggingInterceptor, ResponseInterceptor } from "./common/interceptor";
import { MongooseTodoModule } from "./common/providers/mongoose/mongoose-todo.module";
import { AppConfigModule } from "./config/app-config.module";
import { EventHandlerModule } from "./modules/events/handler/event-handler.module";
import { TodoModule } from "./modules/todo/todo.module";

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    MongooseTodoModule,
    ScheduleModule.forRoot(),
    TodoModule,
    EventHandlerModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
  ]
})
export class AppModule {}
