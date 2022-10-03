import { User } from '../../users/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  user: User;

  @Field()
  access_token: string;
}
