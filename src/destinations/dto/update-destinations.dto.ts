import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinationDto } from './create-destinations.dto';

export class UpdateDestinationDto extends PartialType(CreateDestinationDto) {}
