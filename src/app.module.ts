import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarboneModule } from './carbone/carbone.module';

@Module({
  imports: [CarboneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
