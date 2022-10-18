/* eslint-disable no-shadow */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useGetCatById from '../../hooks/useGetCatById';
import {
  useGetByIdQuery,
  GetByIdQuery,
  CommentEntity,
  useCreateCommentMutation,
} from '../../graphql/generated/schemas';

import './styles.css';
import graphqlRequestClient from '../../client/graphqlRequestClient';
import { REFRESH_ACCESS_TOKEN } from '../../middleware/AuthMiddleware';

export default function CatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const { isLoading, data, refetch } = useGetByIdQuery(
    graphqlRequestClient,
    {
      id: Number(id),
    },
    {
      retry: false,
      onError(error: any) {
        error.response.errors.forEach(async (err: any) => {
          if (err.message.includes('Unauthorized')) {
            try {
              const data = await graphqlRequestClient.request(
                REFRESH_ACCESS_TOKEN
              );
              setCookie('access_token', data.refresh.access_token);
              refetch();
            } catch (e) {
              navigate('/login');
            }
          }
        });
      },
    }
  );

  const { isLoading: loading, mutate: createComment } =
    useCreateCommentMutation(graphqlRequestClient, {
      onError(error: any, variables) {
        error.response.errors.forEach(async (err: any) => {
          if (err.message.includes('Unauthorized')) {
            try {
              await graphqlRequestClient.request(REFRESH_ACCESS_TOKEN);
              console.log('wwww');
              await createComment({
                comment: variables.comment,
              });
            } catch (e) {
              navigate('/login');
            }
          }
        });
      },
    });

  const [comment, setComment] = useState('');

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setComment(e.target.value);
  };

  if (isLoading) return <p>Loading ...</p>;
  const cat = data?.cat;

  const onSubmit = async () => {
    if (comment === '') return;
    await createComment({ comment: { text: comment, catId: Number(cat?.id) } });
    setComment('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className='comments_container'>
      <img src={cat?.url} alt='cat' />
      <div className='comment_input_container'>
        <input
          className='comment_input'
          type='text'
          value={comment}
          onChange={onValueChange}
          onKeyDown={onKeyDown}
        />
        <button
          className='comment_input_button'
          type='button'
          onClick={onSubmit}
        >
          Send
        </button>
      </div>
      <ul className='comments_list'>
        {cat?.comments.map((comment: any) => (
          <li className='comment' key={comment.id}>
            <span>{comment.text}</span>
            <span className='date'>
              {dayjs(comment.createdAt).format('DD/MM/YYYY')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
