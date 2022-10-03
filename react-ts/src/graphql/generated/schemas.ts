import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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


export const CatLikedDocument = gql`
    subscription catLiked {
  catLiked {
    id
    likes
    url
  }
}
    `;

/**
 * __useCatLikedSubscription__
 *
 * To run a query within a React component, call `useCatLikedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCatLikedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatLikedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCatLikedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CatLikedSubscription, CatLikedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CatLikedSubscription, CatLikedSubscriptionVariables>(CatLikedDocument, options);
      }
export type CatLikedSubscriptionHookResult = ReturnType<typeof useCatLikedSubscription>;
export type CatLikedSubscriptionResult = Apollo.SubscriptionResult<CatLikedSubscription>;
export const CheckAuthDocument = gql`
    query checkAuth {
  checkAuth {
    id
    email
  }
}
    `;

/**
 * __useCheckAuthQuery__
 *
 * To run a query within a React component, call `useCheckAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckAuthQuery(baseOptions?: Apollo.QueryHookOptions<CheckAuthQuery, CheckAuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckAuthQuery, CheckAuthQueryVariables>(CheckAuthDocument, options);
      }
export function useCheckAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckAuthQuery, CheckAuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckAuthQuery, CheckAuthQueryVariables>(CheckAuthDocument, options);
        }
export type CheckAuthQueryHookResult = ReturnType<typeof useCheckAuthQuery>;
export type CheckAuthLazyQueryHookResult = ReturnType<typeof useCheckAuthLazyQuery>;
export type CheckAuthQueryResult = Apollo.QueryResult<CheckAuthQuery, CheckAuthQueryVariables>;
export const CreateCatDocument = gql`
    mutation createCat($cat: CreateCatInput!) {
  createCat(createCat: $cat) {
    id
    url
    likes
  }
}
    `;
export type CreateCatMutationFn = Apollo.MutationFunction<CreateCatMutation, CreateCatMutationVariables>;

/**
 * __useCreateCatMutation__
 *
 * To run a mutation, you first call `useCreateCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCatMutation, { data, loading, error }] = useCreateCatMutation({
 *   variables: {
 *      cat: // value for 'cat'
 *   },
 * });
 */
export function useCreateCatMutation(baseOptions?: Apollo.MutationHookOptions<CreateCatMutation, CreateCatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCatMutation, CreateCatMutationVariables>(CreateCatDocument, options);
      }
export type CreateCatMutationHookResult = ReturnType<typeof useCreateCatMutation>;
export type CreateCatMutationResult = Apollo.MutationResult<CreateCatMutation>;
export type CreateCatMutationOptions = Apollo.BaseMutationOptions<CreateCatMutation, CreateCatMutationVariables>;
export const CreateCommentDocument = gql`
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
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCatDocument = gql`
    mutation deleteCat($id: Float!) {
  deleteCat(id: $id)
}
    `;
export type DeleteCatMutationFn = Apollo.MutationFunction<DeleteCatMutation, DeleteCatMutationVariables>;

/**
 * __useDeleteCatMutation__
 *
 * To run a mutation, you first call `useDeleteCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCatMutation, { data, loading, error }] = useDeleteCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCatMutation, DeleteCatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCatMutation, DeleteCatMutationVariables>(DeleteCatDocument, options);
      }
export type DeleteCatMutationHookResult = ReturnType<typeof useDeleteCatMutation>;
export type DeleteCatMutationResult = Apollo.MutationResult<DeleteCatMutation>;
export type DeleteCatMutationOptions = Apollo.BaseMutationOptions<DeleteCatMutation, DeleteCatMutationVariables>;
export const GetByIdDocument = gql`
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

/**
 * __useGetByIdQuery__
 *
 * To run a query within a React component, call `useGetByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetByIdQuery(baseOptions: Apollo.QueryHookOptions<GetByIdQuery, GetByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetByIdQuery, GetByIdQueryVariables>(GetByIdDocument, options);
      }
export function useGetByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetByIdQuery, GetByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetByIdQuery, GetByIdQueryVariables>(GetByIdDocument, options);
        }
export type GetByIdQueryHookResult = ReturnType<typeof useGetByIdQuery>;
export type GetByIdLazyQueryHookResult = ReturnType<typeof useGetByIdLazyQuery>;
export type GetByIdQueryResult = Apollo.QueryResult<GetByIdQuery, GetByIdQueryVariables>;
export const GetCatsDocument = gql`
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

/**
 * __useGetCatsQuery__
 *
 * To run a query within a React component, call `useGetCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCatsQuery(baseOptions?: Apollo.QueryHookOptions<GetCatsQuery, GetCatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCatsQuery, GetCatsQueryVariables>(GetCatsDocument, options);
      }
export function useGetCatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCatsQuery, GetCatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCatsQuery, GetCatsQueryVariables>(GetCatsDocument, options);
        }
export type GetCatsQueryHookResult = ReturnType<typeof useGetCatsQuery>;
export type GetCatsLazyQueryHookResult = ReturnType<typeof useGetCatsLazyQuery>;
export type GetCatsQueryResult = Apollo.QueryResult<GetCatsQuery, GetCatsQueryVariables>;
export const LikeCatDocument = gql`
    mutation likeCat($id: Float!) {
  likeCat(id: $id) {
    id
    likes
  }
}
    `;
export type LikeCatMutationFn = Apollo.MutationFunction<LikeCatMutation, LikeCatMutationVariables>;

/**
 * __useLikeCatMutation__
 *
 * To run a mutation, you first call `useLikeCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeCatMutation, { data, loading, error }] = useLikeCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeCatMutation(baseOptions?: Apollo.MutationHookOptions<LikeCatMutation, LikeCatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeCatMutation, LikeCatMutationVariables>(LikeCatDocument, options);
      }
export type LikeCatMutationHookResult = ReturnType<typeof useLikeCatMutation>;
export type LikeCatMutationResult = Apollo.MutationResult<LikeCatMutation>;
export type LikeCatMutationOptions = Apollo.BaseMutationOptions<LikeCatMutation, LikeCatMutationVariables>;
export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;