import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/exceptions";
import { ApiConfigService } from "./config/api-config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*"
    }
  });
  const appConfig = app.get(ApiConfigService);

  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableShutdownHooks();

  app.setGlobalPrefix("/api/v1");
  await app.listen(appConfig.port, () =>
    console.log("Application running on port: ", appConfig.port, " 🚀")
  );
}

bootstrap();
