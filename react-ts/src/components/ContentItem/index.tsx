
import React from 'react';

import { useState, useCallback, memo } from 'react';
import { useLikeCatMutation, CatEntity } from '../../graphql/generated/schemas';

import './style.css';

const ContentItem: React.FC<CatEntity> =({ likes, url, id }) => {
  const [counter, setCounter] = useState(likes);
  const [likeCat] = useLikeCatMutation();

  const onLikeClick = useCallback(async () => {
    setCounter(counter + 1);
    await likeCat({ variables: { id: Number(id) } });
  }, [counter, id, likeCat]);

  return (
    <div className="home_content_item">
      <img src={url} alt="" />

      <button className="like_button" onClick={onLikeClick}>
        Like
        <span className="like_counter">{counter}</span>
      </button>
    </div>
  );
};

export default memo(ContentItem);
