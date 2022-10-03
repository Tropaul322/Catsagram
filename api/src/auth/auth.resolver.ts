import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const data = await this.authService.login(loginUserInput);
    console.log('DATA', data);
    return data;
  }

  @Mutation(() => LoginResponse)
  singUp(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signUp(loginUserInput);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async checkAuth(@Context('req') req: any) {
    console.log(req.headers.authorization);
    return req.user;
  }
}
