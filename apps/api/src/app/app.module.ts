import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatsModule } from './cats/cat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { CatEntity } from './cats/entities/cat.entity';
import { CommentEntity } from './comments/entities/comment.entity';
import { User } from './users/entities/user.entity';

import { AuthModule } from './auth/auth.module';
import { DataloaderService } from './dataloader/dataloader.service';
import { DataloaderModule } from './dataloader/dataloader.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [DataloaderModule],
      driver: ApolloDriver,
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: './apps/api/schema.gql',
          cors: {
            origin: 'http://13.40.139.212:4200',
            credentials: true,
          },
          sortSchema: true,
          playground: true,
          installSubscriptionHandlers: true,
          context: ({ req, res }) => ({
            loaders: dataloaderService.getLoaders(),
            req,
            res,
          }),
        };
      },
      inject: [DataloaderService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
        ({
          type: process.env.TYPEORM_CONNECTION,
          username: process.env.TYPEORM_USERNAME,
          password: process.env.TYPEORM_PASSWORD,
          host: process.env.TYPEORM_HOST,
          port: process.env.TYPEORM_PORT,
          database: process.env.TYPEORM_DATABASE,
          entities: [CatEntity, User, CommentEntity],
          synchronize: true,
        } as TypeOrmModuleAsyncOptions),
    }),
    CatsModule,
    CommentsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
