import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//make module global so that we don't have to import it in every module
@Global()
@Module({
  //registering prisma service in this module
  providers: [PrismaService],

  //making sure that this PrismaService is available outside this module for other modules to use
  exports: [PrismaService],
})
export class PrismaModule {}
