import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destinations.dto';
import { UpdateDestinationDto } from './dto/update-destinations.dto';

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}
  //CREATE
  async create(userId: number, createDestinationDto: CreateDestinationDto) {
    return this.prisma.destination.create({
      data: {
        ...createDestinationDto,
        travelDate: new Date(createDestinationDto.travelDate),
        userId,
      },
    });
  }
  //FIND ALL
  async findAll() {
    return this.prisma.destination.findMany({});
  }

  //FIND ALL FOR USER
  async findAllForUser(userId: number) {
    return this.prisma.destination.findMany({
      where: { userId },
    });
  }

  //FIND ONE BY ID
  async findOne(userId: number, id: number) {
    const destination = await this.prisma.destination.findFirst({
      where: { id, userId },
    });

    if (!destination) {
      throw new NotFoundException(`Destination not found for id: ${id} `);
    }
    return destination;
  }

  //REMOVE BY ID
  async remove(userId: number, id: number) {
    const destination = await this.prisma.destination.findFirst({
      where: { id, userId },
    });

    if (!destination) {
      throw new NotFoundException(`Destination not found for id: ${id} `);
    }
    const deletedDestination = await this.prisma.destination.delete({
      where: { id, userId },
    });

    return deletedDestination;
  }

  //UPDATE BY ID
  async update(
    userId: number,
    id: number,
    updateDestinationDto: UpdateDestinationDto,
  ) {
    const destination = await this.prisma.destination.findFirst({
      where: { id, userId },
    });

    if (!destination) {
      throw new NotFoundException(`Destination not found for id: ${id} `);
    }
    const updatedDestination = this.prisma.destination.update({
      where: { userId, id },
      data: updateDestinationDto,
    });

    return updatedDestination;
  }
}
