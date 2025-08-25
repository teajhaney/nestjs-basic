import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  userId: string;
}

@Injectable()
// JwtStrategy class is responsible for validating JWT tokens and extracting user information
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Retrieve the JWT secret from environment variables to ensure token integrity and security
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      // Fail fast if the secret is not set to avoid runtime errors later
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    // Configure the strategy with the secret and specify how to extract the JWT from requests
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  // Validate method is called automatically after verifying the JWT's signature and expiration
  // It extracts the user information from the payload to attach it to the request object
  validate(payload: JwtPayload) {
    return { userId: payload.userId };
  }
}
