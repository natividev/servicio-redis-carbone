import { Module } from '@nestjs/common';
import { CarboneModule } from './carbone/carbone.module';
import { CarboneController } from './carbone/carbone.controller';
import { CarboneService } from './carbone/carbone.service';

@Module({
  imports: [CarboneModule],
  controllers: [CarboneController],
  providers: [CarboneService],
})
export class AppModule {}
