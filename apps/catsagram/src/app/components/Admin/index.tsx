import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminContentItem from '../AdminContentItem';
import useCats from '../../../hooks/useCats';
import { CatEntity, useGetCatsQuery, useDeleteCatMutation } from '@cats/data-access';

import './style.css';
import getCookie from '../../../helpers/getCookie';
import graphqlRequestClient from '../../../client/graphqlRequestClient';
import { useCookies } from 'react-cookie';
import useToast from 'apps/catsagram/src/hooks/useToast';
import { REFRESH_ACCESS_TOKEN } from 'apps/catsagram/src/middleware/AuthMiddleware';

function Admin() {
  const toast = useToast();
  const navigate = useNavigate();
  
  const [cookie] = useCookies(['access_token']);
  const { isLoading, mutate: deleteCat  } = useDeleteCatMutation(
    graphqlRequestClient,
    {
      retry: false,
      onSuccess(data: any) {
        toast.addToast({ title: 'Cat deleted', type: 'success' });
      },
      onError(error: any, variables) {
        error.response.errors.forEach(async (err: any) => {
          if (err.message.includes('Unauthorized')) {
            try {
              await graphqlRequestClient.request(REFRESH_ACCESS_TOKEN);
              await deleteCat({ id: variables.id });
            } catch (e) {
              navigate('/login');
            }
          }
        });
      },
    }
  );
  const { isLoading: isCatsLoading, data } = useGetCatsQuery(
    graphqlRequestClient,
    {},
    {
      enabled: Boolean(cookie.access_token),
    },
    {
      authorization: `Bearer ${getCookie('access_token')}`,
    }
  );

  if (isCatsLoading) return <p>Loading ...</p>;


  const onDeleteClick = async (id: string) => {
    await deleteCat({ id: Number(id) });
  };

  if (isCatsLoading) return <p>Loading ...</p>;
  if (!data?.cats) return <p>No data</p>;

  console.log(data?.cats);

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
          {data?.cats?.map((cat: any) => (
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
