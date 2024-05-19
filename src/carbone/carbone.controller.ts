import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarboneService } from './carbone.service';
import { CreateCarboneDto } from './dto/create-carbone.dto';
import { UpdateCarboneDto } from './dto/update-carbone.dto';

@Controller('carbone')
export class CarboneController {
  constructor(private readonly carboneService: CarboneService) {}

  @Post()
  create(@Body() createCarboneDto: CreateCarboneDto) {
    return this.carboneService.create(createCarboneDto);
  }

  @Get()
  findAll() {
    return this.carboneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carboneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarboneDto: UpdateCarboneDto) {
    return this.carboneService.update(+id, updateCarboneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carboneService.remove(+id);
  }
}
