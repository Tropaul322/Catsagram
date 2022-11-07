import React from 'react';
import { Link } from 'react-router-dom';
import AdminContentItem from '../AdminContentItem';
import useCats from '../../hooks/useCats';
import { CatEntity } from '../../graphql/generated/schemas';

import useDeleteCatMutation from '../../hooks/useDeleteCatMutation';

import './style.css';

function Admin() {
  const { isLoading: isCatsLoading, cats } = useCats();
  const { mutate } = useDeleteCatMutation();

  const onDeleteClick = async (id: string) => {
    await mutate({ id: Number(id) });
  };

  if (isCatsLoading) return <p>Loading ...</p>;
  if (!cats) return <p>No data</p>;

  return (
    <div className='admin_wrapper'>
      <div className='admin_header'>
        <div>Admin</div>
        <Link className='add-cat' to='/admin/add-cat'>
          Add cat
        </Link>
      </div>

      <div className='admin_content'>
        <ul className='list'>
          {cats?.cats.map((cat: CatEntity) => (
            <li className='list_item'>
              <AdminContentItem
                // eslint-disable-next-line no-unsafe-optional-chaining
                key={cat.url + cat?.id}
                id={cat?.id}
                url={cat.url}
                likes={cat.likes}
                deleteCat={onDeleteClick}
                createdAt={undefined}
                updatedAt={undefined}
                comments={[]}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
