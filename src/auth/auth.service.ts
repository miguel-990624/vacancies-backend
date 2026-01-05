import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ){}

  async validateUser(email: string, password: string){
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid? user : null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException("Invalid Credentials");

    const payload = { sub: user.id, role: user.role, email: user.email };

    const accessToken = this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET,
      expiresIn: "15m",
    });
    const refreshToken = this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET,
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });
      const user = await this.usersService.findOne(payload.sub);

      if (!user) throw new UnauthorizedException("Invalid refresh token");

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, role: user.role, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: "15m" },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async register(createUserDto: CreateUserDto) {
  const userExists = await this.usersService.findByEmail(createUserDto.email);
  if (userExists) {
    throw new BadRequestException('User with this email already exists');
  }

  const user = await this.usersService.create(createUserDto);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
}
