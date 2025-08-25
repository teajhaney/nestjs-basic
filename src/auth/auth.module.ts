import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGaurd } from './jwt-auth.guard';

@Module({
  imports: [
    // Import PrismaModule to interact with the database
    PrismaModule,
    // Import PassportModule to handle authentication strategies
    PassportModule,
    // Configure JwtModule asynchronously to use environment variables for the secret
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // JWT secret from config
        signOptions: { expiresIn: '1h' }, // Token expiration time
      }),
      inject: [ConfigService],
    }),
    // Import ConfigModule to access environment variables and configuration
    ConfigModule,
  ],
  // Register providers that can be injected into other components
  providers: [AuthService, JwtStrategy],
  // Define controllers to handle incoming requests
  controllers: [AuthController],
  // Export modules and guards that can be used in other modules
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
