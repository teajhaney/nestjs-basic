import {
  Body,
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.guard';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destinations.dto';
import { UpdateDestinationDto } from './dto/update-destinations.dto';

@Controller('destinations')
@UseGuards(JwtAuthGaurd)
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createDestinationDto: CreateDestinationDto,
  ) {
    return this.destinationsService.create(
      req.user.userId,
      createDestinationDto,
    );
  }

  @Get('all')
  async findAll() {
    return this.destinationsService.findAll();
  }

  @Get()
  async findAllForUser(@Request() req) {
    return this.destinationsService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.destinationsService.findOne(req.user.userId, +id);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.destinationsService.remove(req.user.userId, +id);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationsService.update(
      req.user.userId,
      Number(id),
      updateDestinationDto,
    );
  }
}
