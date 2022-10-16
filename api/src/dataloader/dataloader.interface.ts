import { CommentEntity } from 'src/comments/entities/comment.entity';
import DataLoader from 'dataloader';

export interface IDataloaders {
  commentsLoader: DataLoader<number, CommentEntity[]>;
}
