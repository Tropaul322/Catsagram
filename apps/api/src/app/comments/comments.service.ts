import { CatService } from '../cats/cat.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { In, Repository } from 'typeorm';
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
    console.log(comment);
    const newComment = this.commentsRepository.create({ text, catId });
    const createdComment = await this.commentsRepository.save(newComment);
    await this.catsService.emit({
      message: `CommentCreated`,
      key: ['getById'],
    });
    return createdComment;
  }

  public async getCatsComments(catId: number): Promise<CommentEntity[]> {
    return this.findComments(catId);
  }

  public async getAllFriendsByStudentIds(
    catsIds: number[],
  ): Promise<CommentEntity[]> {
    console.log(
      `SELECT * FROM friends WHERE studentId IN (${catsIds.join(',')})`,
    );
    return this.commentsRepository.find({
      where: { catId: In(catsIds) },
      loadRelationIds: true,
    });
  }

  public async getCatsCommentsByBatch(
    catsIds: number[],
  ): Promise<CommentEntity[][]> {
    const comments = await this.getAllFriendsByStudentIds(catsIds);
    const mappedResults = this._mapResultToIds(catsIds, comments);

    return mappedResults;
  }

  private _mapResultToIds(catsId: number[], comments: CommentEntity[]) {
    return catsId.map((id) => comments.filter((comm) => comm.catId === id));
  }
}
