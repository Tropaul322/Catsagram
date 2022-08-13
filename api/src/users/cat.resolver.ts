import { CreateCommentInput } from './inputs/create-comment.input';
import { CommentEntity } from './entities/comment.entity';
import { CreateCatInput } from './inputs/create-cat.input';
import { CatEntity } from './entities/cat.entity';
import {
  Mutation,
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { CatService } from './cat.service';

@Resolver(() => CatEntity)
export class CatResolver {
  constructor(private readonly catService: CatService) {}

  @Mutation(() => CatEntity)
  async createCat(@Args('createCat') cat: CreateCatInput): Promise<CatEntity> {
    return await this.catService.createCat(cat);
  }

  @Query(() => [CatEntity])
  async cats(): Promise<CatEntity[]> {
    return await this.catService.findAll();
  }

  @Query(() => CatEntity)
  async findOne(@Args('id') id: number): Promise<CatEntity> {
    return await this.catService.findOne(id);
  }

  @Mutation(() => CatEntity)
  async likeCat(@Args('id') id: number): Promise<CatEntity> {
    return await this.catService.like(id);
  }

  @Mutation(() => Number)
  async deleteCat(@Args('id') id: number): Promise<number> {
    const deletedCat = await this.catService.delete(id);
    return deletedCat;
  }

  //--------Comments--------//

  @ResolveProperty()
  async comments(@Parent() cat) {
    const { id } = cat;
    return await this.catService.findComments(id);
  }
}

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(private readonly commentsService: CatService) {}

  @Query(() => [CommentEntity])
  async comments1(@Args('id') id: number): Promise<CommentEntity[]> {
    return await this.commentsService.findComments(id);
  }

  @Mutation(() => CommentEntity)
  async createComment(
    @Args('comment') comment: CreateCommentInput,
  ): Promise<CommentEntity> {
    const cat = await this.commentsService.findOne(comment.catId);
    return await this.commentsService.createComment(comment, cat);
  }

  @ResolveProperty()
  async cat(@Parent() comments) {
    const { catId } = comments;
    return await this.commentsService.findOne(catId);
  }
}
