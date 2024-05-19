import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CarboneService } from './carbone.service';
import { Response } from 'express'; // Importa el tipo de dato Response de express

@Controller('carbone')
export class CarboneController {
  constructor(private readonly carboneService: CarboneService) {}

  @Get()
  async renderPDFCarbone(@Res() res: Response) {
    try {
      const payload = {
        firstname: 'Jose',
        lastname: 'Natividad',
      };

      const pdfBuffer = await this.carboneService.renderPDFCarbone(
        payload,
        'ticket.odt',
        'pdf',
      );

      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al generar PDF: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
