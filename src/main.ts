import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //creates an instance of the NestJS application using the AppModule
  const app = await NestFactory.create(AppModule);

  //starts the application and listens on a specified port (defaulting to 3000 if not set in environment variables)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting app:', err);
  process.exit(1);
});
