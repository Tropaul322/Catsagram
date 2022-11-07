import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthService } from './auth.service';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { Res, UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Context('res') res: any,
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ) {
    const data = await this.authService.login(loginUserInput);

    res.cookie('access_token', data.access_token);
    res.cookie('refresh_token', data.refresh_token);
    return data;
  }

  @Mutation(() => LoginResponse)
  singUp(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signUp(loginUserInput);
  }

  @Query(() => LoginResponse)
  async refresh(@Context('req') req: any, @Context('res') res: any) {
    const data = await this.authService.refresh(req.cookies['refresh_token']);
    res.cookie('access_token', data.access_token);
    res.cookie('refresh_token', data.refresh_token);
    return data;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async checkAuth(@Context('req') req: any) {
    console.log(req.user);
    return req.user;
  }
}
