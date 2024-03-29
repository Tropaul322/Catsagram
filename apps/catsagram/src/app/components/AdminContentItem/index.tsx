import React from 'react';
import { CatEntity } from '@cats/data-access';
import './style.css';

type Props = CatEntity & {
  deleteCat: (id: string) => void;
};

const AdminContentItem: React.FC<Props> = ({ url, id, likes, deleteCat }) => (
  <div className='admin_content_item'>
    <img src={url} alt='' />
    <span className='link'>
      Linka: "<a href={url}>{url}</a>"
    </span>
    <div className='actions'>
      <span>
        Like count:
        {likes}
      </span>
      <button
        type='button'
        onClick={() => deleteCat(id)}
        className='delete_button'
      >
        Delete
      </button>
    </div>
  </div>
);

export default AdminContentItem;
