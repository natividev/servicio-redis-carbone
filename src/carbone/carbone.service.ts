import { Injectable, Logger } from '@nestjs/common';
import * as util from 'util';
import * as carbone from 'carbone';
import { join } from 'path';
@Injectable()
export class CarboneService {
  private readonly logger = new Logger(CarboneService.name);

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

      return await renderCarbone(
        join(process.cwd(), templatePath),
        data,
        option,
      );
    } catch (error) {
      this.logger.error('Error during PDF rendering:', error);
      throw new Error(error);
    }
  }
}
