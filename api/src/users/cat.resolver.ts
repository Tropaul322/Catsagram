import { CreateCatInput } from './inputs/create-cat.input';
import { CatEntity } from './entities/cat.entity';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { CatService } from './cat.service';

@Resolver('Cat')
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
}
