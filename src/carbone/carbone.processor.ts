import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { CarboneService } from './carbone.service';
import { Logger } from '@nestjs/common';

@Processor('carbone')
export class CarboneProcessor {
  private readonly logger = new Logger(CarboneProcessor.name);

  constructor(private readonly carboneService: CarboneService) {}

  @Process('transcode')
  async handleTranscode(job: Job) {
    try {
      const { data, nameTemplate, convertTo } = job.data;

      const bufferData = await this.carboneService.renderPDFCarbone(
        data,
        nameTemplate,
        convertTo,
      );
      console.log('aca va el bufferfffff', bufferData);
      return bufferData;
    } catch (error) {
      throw error;
    }
  }
}
