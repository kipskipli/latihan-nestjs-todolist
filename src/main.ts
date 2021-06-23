import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/server/response/http-exception/http_exception.filter";
import { AppConfigService } from "./config/app/config.service";
declare const module: any;
async function boostrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get("AppConfigService");
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.setGlobalPrefix("/api/v1");
  await app.listen(appConfig.port, () => {
    console.log("Application Running On Port: ", appConfig.port);
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
boostrap();
