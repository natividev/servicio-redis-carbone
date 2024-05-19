import { Injectable } from '@nestjs/common';
import { CreateCarboneDto } from './dto/create-carbone.dto';
import { UpdateCarboneDto } from './dto/update-carbone.dto';

@Injectable()
export class CarboneService {
  create(createCarboneDto: CreateCarboneDto) {
    return 'This action adds a new carbone';
  }

  findAll() {
    return `This action returns all carbone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carbone`;
  }

  update(id: number, updateCarboneDto: UpdateCarboneDto) {
    return `This action updates a #${id} carbone`;
  }

  remove(id: number) {
    return `This action removes a #${id} carbone`;
  }
}
