import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CatEntity = {
  __typename?: 'CatEntity';
  comments: Array<CommentEntity>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type CommentEntity = {
  __typename?: 'CommentEntity';
  cat: CatEntity;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateCatInput = {
  likes: Scalars['Float'];
  url: Scalars['String'];
};

export type CreateCommentInput = {
  catId: Scalars['Float'];
  text: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCat: CatEntity;
  createComment: CommentEntity;
  createUser: User;
  deleteCat: Scalars['Float'];
  likeCat: CatEntity;
  login: LoginResponse;
  singUp: LoginResponse;
};


export type MutationCreateCatArgs = {
  createCat: CreateCatInput;
};


export type MutationCreateCommentArgs = {
  comment: CreateCommentInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteCatArgs = {
  id: Scalars['Float'];
};


export type MutationLikeCatArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationSingUpArgs = {
  loginUserInput: LoginUserInput;
};

export type Query = {
  __typename?: 'Query';
  cat: CatEntity;
  cats: Array<CatEntity>;
  checkAuth: User;
  comments: Array<CommentEntity>;
  refresh: LoginResponse;
  user: User;
  users: Array<User>;
};


export type QueryCatArgs = {
  id: Scalars['Float'];
};


export type QueryCommentsArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  email: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  catLiked: CatEntity;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
};

export type CatLikedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CatLikedSubscription = { __typename?: 'Subscription', catLiked: { __typename?: 'CatEntity', id: string, likes: number, url: string } };

export type CheckAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckAuthQuery = { __typename?: 'Query', checkAuth: { __typename?: 'User', id: string, email: string } };

export type CreateCatMutationVariables = Exact<{
  cat: CreateCatInput;
}>;


export type CreateCatMutation = { __typename?: 'Mutation', createCat: { __typename?: 'CatEntity', id: string, url: string, likes: number } };

export type CreateCommentMutationVariables = Exact<{
  comment: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentEntity', id: string, text: string, cat: { __typename?: 'CatEntity', id: string, likes: number } } };

export type DeleteCatMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteCatMutation = { __typename?: 'Mutation', deleteCat: number };

export type GetByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetByIdQuery = { __typename?: 'Query', cat: { __typename?: 'CatEntity', id: string, createdAt: any, url: string, likes: number, comments: Array<{ __typename?: 'CommentEntity', id: string, text: string, createdAt: any, updatedAt: any }> } };

export type GetCatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCatsQuery = { __typename?: 'Query', cats: Array<{ __typename?: 'CatEntity', id: string, url: string, likes: number, comments: Array<{ __typename?: 'CommentEntity', id: string, text: string }> }> };

export type LikeCatMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LikeCatMutation = { __typename?: 'Mutation', likeCat: { __typename?: 'CatEntity', id: string, likes: number } };

export type LoginMutationVariables = Exact<{
  user: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', email: string, id: string } } };


export const CatLikedDocument = `
    subscription catLiked {
  catLiked {
    id
    likes
    url
  }
}
    `;
export const CheckAuthDocument = `
    query checkAuth {
  checkAuth {
    id
    email
  }
}
    `;
export const useCheckAuthQuery = <
      TData = CheckAuthQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CheckAuthQueryVariables,
      options?: UseQueryOptions<CheckAuthQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CheckAuthQuery, TError, TData>(
      variables === undefined ? ['checkAuth'] : ['checkAuth', variables],
      fetcher<CheckAuthQuery, CheckAuthQueryVariables>(client, CheckAuthDocument, variables, headers),
      options
    );
export const CreateCatDocument = `
    mutation createCat($cat: CreateCatInput!) {
  createCat(createCat: $cat) {
    id
    url
    likes
  }
}
    `;
export const useCreateCatMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCatMutation, TError, CreateCatMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCatMutation, TError, CreateCatMutationVariables, TContext>(
      ['createCat'],
      (variables?: CreateCatMutationVariables) => fetcher<CreateCatMutation, CreateCatMutationVariables>(client, CreateCatDocument, variables, headers)(),
      options
    );
export const CreateCommentDocument = `
    mutation createComment($comment: CreateCommentInput!) {
  createComment(comment: $comment) {
    id
    text
    cat {
      id
      likes
    }
  }
}
    `;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['createComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    );
export const DeleteCatDocument = `
    mutation deleteCat($id: Float!) {
  deleteCat(id: $id)
}
    `;
export const useDeleteCatMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCatMutation, TError, DeleteCatMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCatMutation, TError, DeleteCatMutationVariables, TContext>(
      ['deleteCat'],
      (variables?: DeleteCatMutationVariables) => fetcher<DeleteCatMutation, DeleteCatMutationVariables>(client, DeleteCatDocument, variables, headers)(),
      options
    );
export const GetByIdDocument = `
    query getById($id: Float!) {
  cat(id: $id) {
    id
    createdAt
    url
    likes
    comments {
      id
      text
      createdAt
      updatedAt
    }
  }
}
    `;
export const useGetByIdQuery = <
      TData = GetByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetByIdQueryVariables,
      options?: UseQueryOptions<GetByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetByIdQuery, TError, TData>(
      ['getById', variables],
      fetcher<GetByIdQuery, GetByIdQueryVariables>(client, GetByIdDocument, variables, headers),
      options
    );
export const GetCatsDocument = `
    query GetCats {
  cats {
    id
    url
    likes
    comments {
      id
      text
    }
  }
}
    `;
export const useGetCatsQuery = <
      TData = GetCatsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetCatsQueryVariables,
      options?: UseQueryOptions<GetCatsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCatsQuery, TError, TData>(
      variables === undefined ? ['GetCats'] : ['GetCats', variables],
      fetcher<GetCatsQuery, GetCatsQueryVariables>(client, GetCatsDocument, variables, headers),
      options
    );
export const LikeCatDocument = `
    mutation likeCat($id: Float!) {
  likeCat(id: $id) {
    id
    likes
  }
}
    `;
export const useLikeCatMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LikeCatMutation, TError, LikeCatMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LikeCatMutation, TError, LikeCatMutationVariables, TContext>(
      ['likeCat'],
      (variables?: LikeCatMutationVariables) => fetcher<LikeCatMutation, LikeCatMutationVariables>(client, LikeCatDocument, variables, headers)(),
      options
    );
export const LoginDocument = `
    mutation login($user: LoginUserInput!) {
  login(loginUserInput: $user) {
    user {
      email
      id
    }
    access_token
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );