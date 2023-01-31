import { CommentsModule } from './../comments/comments.module';
import { CommentEntity } from '../comments/entities/comment.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CatEntity } from './entities/cat.entity';
import { CatService } from './cat.service';
import { CatResolver } from './cat.resolver';
import { CatController } from './cat.controller';

@Module({
  imports: [
    forwardRef(() => CommentsModule),
    TypeOrmModule.forFeature([CatEntity, CommentEntity]),
    ClientsModule.register([
      {
        name: 'CAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rmqM:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [CatService, CatResolver],
  controllers: [CatController],
  exports: [CatService],
})
export class CatsModule {}
