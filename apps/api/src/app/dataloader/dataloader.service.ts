import { CommentsService } from './../comments/comments.service';
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { CommentEntity } from '../comments/entities/comment.entity';
import { IDataloaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(private readonly commentsService: CommentsService) {}

  getLoaders(): IDataloaders {
    const commentsLoader = this._createFriendsLoader();
    return {
      commentsLoader,
    };
  }

  private _createFriendsLoader() {
    return new DataLoader<number, CommentEntity[]>(
      async (keys: readonly number[]) =>
        await this.commentsService.getCatsCommentsByBatch(keys as number[]),
    );
  }
}
