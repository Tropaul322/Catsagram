import { LoginUserInput } from './dto/login-user.input';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    const valid = bcrypt.compareSync(password, user.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.email);
    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      refresh_token: this.jwtService.sign(
        { email: user.email, sub: user.id },
        { expiresIn: '50m' },
      ),
      user: {
        ...result,
        id: user.id,
      },
    };
  }

  async refresh(refresh_token: string) {
    const { email, sub, ...rest } = this.jwtService.verify(refresh_token);

    return {
      access_token: this.jwtService.sign({ email, sub }),
      refresh_token: this.jwtService.sign({ email, sub }, { expiresIn: '50m' }),
      user: {
        email,
        id: sub,
      },
    };
  }

  async signUp(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.email);

    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hashSync(loginUserInput.password, 10);

    return this.usersService.create({
      ...loginUserInput,
      password,
    });
  }
}
