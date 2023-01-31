import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommentEntity } from '../../comments/entities/comment.entity';

@ObjectType()
@Entity('cats', {orderBy: {id: "DESC"} })
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
