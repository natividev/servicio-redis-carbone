import { Module } from '@nestjs/common';
import { CarboneService } from './carbone.service';
import { CarboneController } from './carbone.controller';
import { BullModule } from '@nestjs/bull';
import { CarboneProcessor } from './carbone.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'carbone',
    }),
  ],
  controllers: [CarboneController],
  providers: [CarboneService, CarboneProcessor],
})
export class CarboneModule {}
