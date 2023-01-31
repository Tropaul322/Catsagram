import React from 'react'
import { useCookies } from 'react-cookie';
import { memo } from 'react';
import ContentItem from '../ContentItem';
import { useGetCatsQuery } from '@cats/data-access';

import getCookie from '@/catsagram/helpers/getCookie';
import graphqlRequestClient from '@/catsagram/client/graphqlRequestClient';
import './style.css';

const Home = () => {
  console.log('Home');
  const [cookie] = useCookies(['access_token']);
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

  console.log(data);

  return (
    <div className='home_container'>
      {data?.cats?.map((cat: any) => (
        <ContentItem
          key={cat?.id + cat.url}
          id={cat?.id}
          url={cat.url}
          likes={cat.likes}
          createdAt={undefined}
          updatedAt={undefined}
          comments={[]}
        />
      ))}
    </div>
  );
};

export default memo(Home);
