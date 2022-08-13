/* eslint-disable no-shadow */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import {
  useGetByIdQuery,
  useCreateCommentMutation,
} from '../../graphql/generated/schemas';

import './styles.css';

export default function CatPage() {
  const { id } = useParams();
  const [createComment] = useCreateCommentMutation();
  const { data, loading, refetch } = useGetByIdQuery({
    variables: { id: Number(id) },
  });
  const [comment, setComment] = useState('');

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setComment(e.target.value);
  };

  if (loading) return <p>Loading ...</p>;

  const cat = data?.findOne;

  const onSubmit = async () => {
    if (comment === '') return;
    await createComment({
      variables: { comment: { text: comment, catId: Number(cat?.id) } },
    });
    await refetch();
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
        {cat?.comments.map((comment) => (
          <li className="comment" key={comment.id}>
            <span>{comment.text}</span>
            <span className="date">{dayjs(comment.createdAt).format('DD/MM/YYYY')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
