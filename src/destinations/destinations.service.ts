import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destinations.dto';

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createDestinationDto: CreateDestinationDto) {
    return this.prisma.destination.create({
      data: {
        ...createDestinationDto,
        travelDate: new Date(createDestinationDto.travelDate),
        userId,
      },
    });
  }
  async findAll() {
    return this.prisma.destination.findMany({});
  }

  async findAllForUser(userId: number) {
    return this.prisma.destination.findMany({
      where: { userId },
    });
  }

  async findOne(userId: number, id: number) {
    const destination = await this.prisma.destination.findFirst({
      where: { id, userId },
    });

    if (!destination) {
      throw new NotFoundException(`Destination not found for id: ${id} `);
    }
    return destination;
  }
}
