import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() registerDto: RegisterDto) {
    // Implementation for signup endpoint
    return this.authService.signup(registerDto);
  }
  @Get('signin')
  async signin(@Body() loginDto: LoginDto) {
    // Implementation for signin endpoint
    return this.authService.signin(loginDto);
  }
}
