import { User } from '../src/app/users/entities/user.entity';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import cp from 'child_process';
import process from 'process';

import request from 'supertest-graphql';
import gql from 'graphql-tag';
import cookieParser from 'cookie-parser';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@api/app/app.module';

describe('Global Tests', () => {
  let httpServer: any;
  let app: any;
  let access_token: any;
  let catsArray = [];
  

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    console.log('object');
    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();

    httpServer = app.getHttpServer();

    // const { data }: any = await request(httpServer)
    //   .mutate(
    //     gql`
    //       mutation Login($loginCred: LoginUserInput!) {
    //         login(loginUserInput: $loginCred) {
    //           access_token
    //         }
    //       }
    //     `
    //   )
    //   .variables({
    //     loginCred: {
    //       email: 'test1',
    //       password: 'secure',
    //     },
    //   });
    // access_token = data.login.access_token;

    catsArray = [
      {
        url: 'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg',
        likes: 1,
      },
      {
        url: 'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg',
        likes: 4,
      },
    ];

    const {data} = await request(httpServer)
    .query(
      gql`
      query {
        user(email: "test1"){
          email
        }
      }
      `
    )

    console.log(data, 
      "USER")

    // await Promise.all(
    //  catsArray.map(async (cat) => {
    //     await request(httpServer)
    //       .mutate(
    //         gql`
    //           mutation createCat($cat: CreateCatInput!) {
    //             createCat(createCat: $cat) {
    //               id
    //             }
    //           }
    //         `
    //       )
    //       .variables({
    //         cat: {
    //           url: cat.url,
    //           likes: cat.likes,
    //         },
    //       });
    //   })
    // );
    //

  });

  afterAll(async () => {
    // await Promise.all(catsArray.map(async (_cat, idx) => {
    //   await request(httpServer).mutate(
    //     gql`
    //     mutation {
    //       deleteCat(id: ${idx + 1}) {
    //         id
    //       }
    //     }`
    //   )
    // }))
    await app.close();
  });

  describe('', () => {
    it('should return likes', async () => {
      const a = 1;
      console.log(access_token);
      expect(a).toBeLessThan(3);
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
