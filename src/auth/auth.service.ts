import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  //HANDLE new user registration
  async signup(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    //check if user exists
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new ConflictException('User already exists! try a different email');
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create new user object
    //create new user
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    //remove password field from user object before returning
    const { password: _, ...result } = newUser;
    //return new user
    return result;
  }

  //HANDLE user sign in
  async signin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    //check if user exists
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        'Email or password is incorrect, please provide a valid credientials',
      );
    }

    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Email or password is incorrect, please provide a valid credientials',
      );
    }
    const token = this.jwtService.sign({ userId: user.id });

    const { password: _, ...result } = user;

    return { ...result, token };
  }
}
