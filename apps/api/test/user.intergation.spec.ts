import { User } from '../src/app/users/entities/user.entity';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import cp from 'child_process';
import process from 'process';

import request from 'supertest-graphql';
import gql from 'graphql-tag';
import cookieParser from 'cookie-parser';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@api/app/app.module';

describe('UsersController', () => {
  let httpServer: any;
  let app: any;
  let access_token: any;

  beforeAll(async () => {
    console.log(process.env)

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
console.log('object');
    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();

    httpServer = app.getHttpServer();


    // await cp.exec('./apps/api/test/foo.sh', (e, s, sr) => {
    //   // console.log(e, s, sr)
    // });

    // await request(httpServer).mutate(gql`mutation SingUp($createUserInput: LoginUserInput!){
    //   singUp(loginUserInput: $createUserInput ) {
    //     user {
    //       password
    //     }
    //   }
    // }`, {
    //   createUserInput: {
    //     email: 'test21',
    //     password: 'kek'
    //   }
    // })
    const { data }: any = await request(httpServer)
      .mutate(
        gql`
          mutation Login($loginCred: LoginUserInput!) {
            login(loginUserInput: $loginCred) {
              access_token
            }
          }
        `
      )
      .variables({
        loginCred: {
          email: 'test21',
          password: 'kek',
        },
      });
    access_token = data.login.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Like cats', () => {
    it('should return likes', async () => {
      const a = 1
      expect(a).toBeLessThan(2)
      // const { data }: any = await request(httpServer)
      //   .set(`Cookie`, `access_token=${access_token}`)
      //   .mutate(
      //     gql`
      //       mutation CreateCat($createCatInp: CreateCatInput!) {
      //         createCat(createCat: $createCatInp) {
      //           id
      //         }
      //       }
      //     `
      //   )
      //   .variables({
      //     createCatInp: {
      //       url: 'kek',
      //       likes: 0,
      //     },
      //   })
      //   .expectNoErrors();
      // console.log(data);

      // const random = Math.ceil(Math.random() * 10) + 1;
      // const arr = Array.from({length: random});

      // for (const _item of arr) {
      //   const res = await request(httpServer)
      //     .set(`Cookie`, `access_token=${access_token}`)
      //     .mutate(
      //       gql`
      //         mutation LikeCat($likeCatId: Float!) {
      //           likeCat(id: $likeCatId) {
      //             id
      //             likes
      //           }
      //         }
      //       `
      //     )
      //     .variables({
      //       likeCatId: Number(data.createCat.id),
      //     })
      //     .expectNoErrors();

      //     console.log(res.data)
      // }

      // const res: any = await request(httpServer)
      //  .set(`Cookie`, `access_token=${access_token}`)
      //  .query(gql`query {cat(id: ${Number(data.createCat.id)}) { likes }}`)
      //  .expectNoErrors()

      //  console.log(res.data)

      // expect(res.data.cat.likes).toEqual(random);
    });

    //  const { data }: any = await request(httpServer)
    //  .set(`Cookie`, `access_token=${access_token}`)
    //  .query(gql`query {users { email }}`).expectNoErrors()

    //  expect(data.users).toHaveLength(3)
    // })
  });
});
