import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { memo, useState } from 'react';
import ContentItem from '../ContentItem';
import useCats from '../../hooks/useCats';
import { CatEntity, useGetCatsQuery } from '../../graphql/generated/schemas';

import getCookie from '../../helpers/getCookie';
import graphqlRequestClient from '../../client/graphqlRequestClient';
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
          // eslint-disable-next-line no-unsafe-optional-chaining
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
