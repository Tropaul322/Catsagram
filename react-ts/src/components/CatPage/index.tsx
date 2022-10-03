/* eslint-disable no-shadow */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import useGetCatById from '../../hooks/useGetCatById';
import useCreateCommentMutation from '../../hooks/useCreateCommentMutation';
import { CommentEntity } from '../../graphql/generated/schemas';

import './styles.css';

export default function CatPage() {
  const { id } = useParams();
  const { mutate } = useCreateCommentMutation();
  const { isLoading: isCatLoading, cat: selectedCat } = useGetCatById({ id: Number(id) });
  const [comment, setComment] = useState('');

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setComment(e.target.value);
  };

  if (isCatLoading) return <p>Loading ...</p>;
  const cat = selectedCat?.cat;

  const onSubmit = async () => {
    if (comment === '') return;
    await mutate(
      { comment: { text: comment, catId: Number(cat?.id) } },
    );
    setComment('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="comments_container">
      <img src={cat?.url} alt="cat" />
      <div className="comment_input_container">
        <input className="comment_input" type="text" value={comment} onChange={onValueChange} onKeyDown={onKeyDown} />
        <button className="comment_input_button" type="button" onClick={onSubmit}>Send</button>
      </div>
      <ul className="comments_list">
        {cat?.comments.map((comment: CommentEntity) => (
          <li className="comment" key={comment.id}>
            <span>{comment.text}</span>
            <span className="date">{dayjs(comment.createdAt).format('DD/MM/YYYY')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
