import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { JWTConfigModule } from './config/jwt/config.module';

@Module({
  imports: [
      AppConfigModule, 
      JWTConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
