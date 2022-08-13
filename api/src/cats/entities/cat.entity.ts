import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommentEntity } from 'src/comments/entities/comment.entity';

@ObjectType()
@Entity('cats')
export class CatEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  likes: number;

  @OneToMany(() => CommentEntity, (comment) => comment.cat)
  @Field(() => [CommentEntity])
  comments: CommentEntity[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
