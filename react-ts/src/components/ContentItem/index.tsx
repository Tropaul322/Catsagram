/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';
import { useLikeCatMutation, CatEntity } from '../../graphql/generated/schemas';
import { ReactComponent as Heart } from '../../assets/icons/Heart.svg';
import { ReactComponent as Comment } from '../../assets/icons/Comment.svg';

import './style.css';
import useToast from '../../hooks/useToast';
import graphqlRequestClient from '../../client/graphqlRequestClient';
import { REFRESH_ACCESS_TOKEN } from '../../middleware/AuthMiddleware';

const ContentItem: React.FC<CatEntity> = ({ likes, url, id }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const { isLoading, mutate: likeCat } = useLikeCatMutation(
    graphqlRequestClient,
    {
      retry: false,
      onSuccess(data: any) {
        toast.addToast({ title: 'Cat liked', type: 'success' });
      },
      onError(error: any, variables) {
        error.response.errors.forEach(async (err: any) => {
          if (err.message.includes('Unauthorized')) {
            try {
              await graphqlRequestClient.request(REFRESH_ACCESS_TOKEN);
              await likeCat({ id: variables.id });
            } catch (e) {
              navigate('/login');
            }
          }
        });
      },
    }
  );

  const onLikeClick = useCallback(async () => {
    await likeCat({ id: Number(id) });
  }, [id]);

  const onCatClick = useCallback(() => {
    navigate(`/${id}`);
  }, [id]);

  return (
    <div className='home_content_item'>
      <img src={url} alt='' onClick={onCatClick} />
      <div className='item_actions_container'>
        <div className='item_actions'>
          <Heart className='like_icon' onClick={onLikeClick} />
          <Comment className='comment_icon' />
        </div>
        <span className='likes_count'>Total likes: {likes}</span>
      </div>
    </div>
  );
};

export default memo(ContentItem);
