import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CarboneService } from './carbone.service';
import { Response } from 'express'; // Importa el tipo de dato Response de express

@Controller('carbone')
export class CarboneController {
  constructor(private readonly carboneService: CarboneService) {}

  @Post('render')
  async addRenderJob(
    @Body() body: { data: any; nameTemplate: string; convertTo?: string },
    @Res() res: Response,
  ) {
    try {
      const { data, nameTemplate, convertTo } = body;

      const job = await this.carboneService.addRenderJob(
        data,
        nameTemplate,
        convertTo || 'pdf',
      );

      res
        .status(HttpStatus.ACCEPTED)
        .json({ message: 'Job added to the queue', job });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al agregar trabajo a la cola: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('download')
  async downloadPDF(@Query('jobId') jobId: string, @Res() res: Response) {
    try {
      const pdfBuffer = await this.carboneService.getPdfBufferFromJob(jobId);

      // Establecer los encabezados de respuesta para indicar que se está enviando un archivo PDF
      res.setHeader('Content-Type', 'application/pdf');

      // Enviar el buffer como respuesta
      res.send(pdfBuffer);
    } catch (error) {
      // Capturar errores y devolver una respuesta de error apropiada
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al descargar el PDF: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
