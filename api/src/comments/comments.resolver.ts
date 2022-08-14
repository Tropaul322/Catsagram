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
import { CatService } from 'src/cats/cat.service';

@Resolver(() => CommentEntity)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly CatsService: CatService,
  ) {}

  @Query(() => [CommentEntity])
  async comments(@Args('id') id: number): Promise<CommentEntity[]> {
    return await this.commentsService.findComments(id);
  }

  @Mutation(() => CommentEntity)
  async createComment(
    @Args('comment') comment: CreateCommentInput,
  ): Promise<CommentEntity> {
    return await this.commentsService.createComment(comment);
  }

  @ResolveProperty()
  async cat(@Parent() comments) {
    const { cat } = comments;
    return await this.CatsService.findOne(cat);
  }
}
