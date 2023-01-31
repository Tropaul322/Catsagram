import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { CatEntity } from '../../cats/entities/cat.entity';

@ObjectType()
@Entity('comments', {orderBy: {createdAt: "DESC"} })
export class CommentEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Column()
  catId: number;

  @ManyToOne(() => CatEntity, (cat: CatEntity) => cat.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'catId' })
  @Field(() => CatEntity)
  cat: CatEntity;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
