import { CommentEntity } from './entities/comment.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CatEntity } from './entities/cat.entity';
import { CatService } from './cat.service';
import { CatResolver, CommentResolver } from './cat.resolver';
import { CatController } from './cat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatEntity]),
    TypeOrmModule.forFeature([CommentEntity]),
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
  providers: [CatService, CatResolver, CommentResolver],
  controllers: [CatController],
})
export class catModule {}
