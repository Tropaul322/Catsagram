import { Module } from '@nestjs/common';
import { CommentsModule } from '../comments/comments.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [CommentsModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
