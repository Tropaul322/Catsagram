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
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type CreateCatInput = {
  likes: Scalars['Float'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCat: CatEntity;
  deleteCat: Scalars['Float'];
  likeCat: CatEntity;
};


export type MutationCreateCatArgs = {
  createCat: CreateCatInput;
};


export type MutationDeleteCatArgs = {
  id: Scalars['Float'];
};


export type MutationLikeCatArgs = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  cats: Array<CatEntity>;
  findOne: CatEntity;
};


export type QueryFindOneArgs = {
  id: Scalars['Float'];
};

export type CreateCatMutationVariables = Exact<{
  cat: CreateCatInput;
}>;


export type CreateCatMutation = { __typename?: 'Mutation', createCat: { __typename?: 'CatEntity', id: string, url: string, likes: number } };

export type DeleteCatMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteCatMutation = { __typename?: 'Mutation', deleteCat: number };

export type GetCatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCatsQuery = { __typename?: 'Query', cats: Array<{ __typename?: 'CatEntity', id: string, url: string, likes: number }> };

export type LikeCatMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LikeCatMutation = { __typename?: 'Mutation', likeCat: { __typename?: 'CatEntity', id: string, likes: number } };


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
export const GetCatsDocument = gql`
    query GetCats {
  cats {
    id
    url
    likes
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