import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CatEntity } from './entities/cat.entity';
import { CatService } from './cat.service';
import { CatResolver } from './cat.resolver';
import { CatController } from './cat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatEntity]),
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
})
export class catModule {}
