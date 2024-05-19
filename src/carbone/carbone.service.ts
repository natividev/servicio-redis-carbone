import { Injectable, Logger } from '@nestjs/common';
import * as util from 'util';
import * as carbone from 'carbone';
import { join } from 'path';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
@Injectable()
export class CarboneService {
  private readonly logger = new Logger(CarboneService.name);

  constructor(@InjectQueue('carbone') private readonly carboneQueue: Queue) {}

  async renderPDFCarbone<T>(
    data: T,
    nameTemplate,
    convertTo: string = 'pdf',
  ): Promise<Buffer> {
    try {
      const option = {
        convertTo,
      };

      const renderCarbone = util.promisify(carbone.render) as (
        template: string,
        data: T,
        option: object,
      ) => Promise<Buffer>;

      const templatePath = `src/templates/${nameTemplate}`;

      if (!templatePath) {
        throw new Error(
          `La plantilla ${nameTemplate} no se encuentra en la ruta especificada.`,
        );
      }

      const bufferData = await renderCarbone(
        join(process.cwd(), templatePath),
        data,
        option,
      );

      console.log('aca va el buffer', bufferData);

      return bufferData;
    } catch (error) {
      this.logger.error('Error during PDF rendering:', error);
      throw new Error(error);
    }
  }

  async getPdfBufferFromJob(jobId: string): Promise<Buffer> {
    const job = await this.carboneQueue.getJob(jobId);
    if (!job) {
      throw new Error(`Job with ID ${jobId} not found.`);
    }
    console.log(job);

    // Comprueba si el trabajo ha sido completado
    if (job.isCompleted()) {
      return job.returnvalue;
    } else {
      throw new Error(`Job with ID ${jobId} has not been completed yet.`);
    }
  }

  async addRenderJob<T>(
    data: T,
    nameTemplate: string,
    convertTo: string = 'pdf',
  ) {
    return await this.carboneQueue.add(
      'transcode',
      { data, nameTemplate, convertTo },
      {
        attempts: 3, // reintentos en caso de fallo
        backoff: 5000, // esperar 5 segundos entre reintentos
      },
    );
  }
}
