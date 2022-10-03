/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import useLikeCatMutation from '../../hooks/useLikeCatMutation';
import { CatEntity } from '../../graphql/generated/schemas';
import { ReactComponent as Heart } from '../../assets/icons/Heart.svg';
import { ReactComponent as Comment } from '../../assets/icons/Comment.svg';

import './style.css';
import useToast from '../../hooks/useToast';

const ContentItem: React.FC<CatEntity> = ({ likes, url, id }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate } = useLikeCatMutation();

  const onLikeClick = useCallback(async () => {
    await mutate({ id: Number(id) });
    toast.addToast({ title: 'Cat liked', type: 'success' });
  }, [id]);

  const onCatClick = useCallback(
    () => {
      navigate(`/${id}`);
    },
    [id],
  );

  return (
    <div className="home_content_item">
      <img src={url} alt="" onClick={onCatClick} />
      <div className="item_actions_container">
        <div className="item_actions">
          <Heart className="like_icon" onClick={onLikeClick} />
          <Comment className="comment_icon" />
        </div>
        <span className="likes_count">
          Total likes:
          {' '}
          {likes}
        </span>
      </div>

    </div>
  );
};

export default memo(ContentItem);
