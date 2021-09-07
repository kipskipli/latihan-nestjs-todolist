import { NestFactory } from "@nestjs/core";
import * as helmet from "helmet";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/exceptions";
import { AppConfigService } from "./config/app/app-config.service";

// webpack hot reload configuration
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.setGlobalPrefix("/api/v1");
  await app.listen(appConfig.port, () =>
    console.log("Application running on port: ", appConfig.port, " 🚀")
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
