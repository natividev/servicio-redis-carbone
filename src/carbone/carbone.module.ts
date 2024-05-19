import { Module } from '@nestjs/common';
import { CarboneService } from './carbone.service';
import { CarboneController } from './carbone.controller';

@Module({
  controllers: [CarboneController],
  providers: [CarboneService],
})
export class CarboneModule {}
