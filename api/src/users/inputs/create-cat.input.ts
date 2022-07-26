import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field()
  url: string;
  @Field()
  likes: number;
}
