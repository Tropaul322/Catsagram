import { CommentsService } from './comments.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentInput } from './inputs/create-comment.input';
import { CatService } from '../cats/cat.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => CommentEntity)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly CatsService: CatService,
  ) {}

  @Query(() => [CommentEntity])
  @UseGuards(JwtAuthGuard)
  async comments(@Args('id') id: number): Promise<CommentEntity[]> {
    return await this.commentsService.findComments(id);
  }

  @Mutation(() => CommentEntity)
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Args('comment') comment: CreateCommentInput,
  ): Promise<CommentEntity> {
    return await this.commentsService.createComment(comment);
  }

  @ResolveProperty()
  async cat(@Parent() comments: CommentEntity) {
    const { catId } = comments;
    return await this.CatsService.findOne(catId);
  }
}
