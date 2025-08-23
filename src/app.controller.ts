import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //appService is injected into the controller via the constructor
  //this is an example of constructor based dependency injection, a core concept in NestJS
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //using the injected service to get the getHello method
    return this.appService.getHello();
  }
}
