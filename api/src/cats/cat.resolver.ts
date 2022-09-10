import { CommentsService } from './../comments/comments.service';
import { CreateCatInput } from './inputs/create-cat.input';
import { CatEntity } from './entities/cat.entity';
import {
  Mutation,
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { CatService } from './cat.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => CatEntity)
export class CatResolver {
  constructor(
    private readonly catService: CatService,
    private readonly commentsService: CommentsService,
  ) {}

  @Subscription(() => CatEntity, {
    name: 'catLiked',
  })
  catLiked() {
    return pubSub.asyncIterator('catLiked');
  }

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
    const cat = await this.catService.findOne(id);
    pubSub.publish('catLiked', { catLiked: cat });
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
    return await this.commentsService.findComments(id);
  }
}
