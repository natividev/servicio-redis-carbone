import { Module } from '@nestjs/common';
import { CarboneModule } from './carbone/carbone.module';
import { CarboneController } from './carbone/carbone.controller';
import { CarboneService } from './carbone/carbone.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        // password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
      },
    }),
    BullModule.registerQueue({
      name: 'carbone',
    }),
    CarboneModule,
  ],
  controllers: [CarboneController],
  providers: [CarboneService],
})
export class AppModule {}
