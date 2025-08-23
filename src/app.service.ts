import { Injectable } from '@nestjs/common';
//service class which can be injected into controllers or other services
//services typically contain business logic and are a fundamental part of the NestJS architecture
@Injectable() //decorator marks the class as a provider that can be managed by NestJS's dependency injection system
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
