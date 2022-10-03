import { CatService } from 'src/cats/cat.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './inputs/create-comment.input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
    private readonly catsService: CatService,
  ) {}

  async findComments(catId: number): Promise<CommentEntity[]> {
    return await this.commentsRepository.find({
      where: { cat: catId },
      order: { createdAt: -1 },
    });
  }

  async createComment(comment: CreateCommentInput): Promise<CommentEntity> {
    const { text, catId } = comment;
    const newComment = this.commentsRepository.create({ text, cat: catId });
    const createdComment = await this.commentsRepository.save(newComment);
    await this.catsService.emit({
      message: `CommentCreated`,
      key: ['cat'],
    });
    return createdComment;
  }
}
