import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CatEntity } from './cat.entity';

@ObjectType()
@Entity('comments')
export class CommentEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @ManyToOne(() => CatEntity, (cat: CatEntity) => cat.comments)
  @Field(() => CatEntity)
  cat: CatEntity;

  @Field()
  @Column()
  catId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
