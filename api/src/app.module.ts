import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatsModule } from './cats/cat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
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
          autoSchemaFile: 'schema.gql',
          cors: {
            origin: 'http://localhost:3000',
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
          type: config.get('TYPEORM_CONNECTION'),
          username: config.get<string>('TYPEORM_USERNAME'),
          password: config.get<number>('TYPEORM_PASSWORD'),
          host: config.get<string>('TYPEORM_HOST'),
          port: config.get<number>('TYPEORM_PORT'),
          database: config.get<string>('TYPEORM_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
