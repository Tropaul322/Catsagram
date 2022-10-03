import { Link } from 'react-router-dom';
import { memo } from 'react';
import ContentItem from '../ContentItem';
import useCats from '../../hooks/useCats';
import { CatEntity } from '../../graphql/generated/schemas';

import './style.css';
import { useUserContext } from '../../context/user.context';
import getCookie from '../../helpers/getCookie';

const Home = () => {
  const { isLoading: isCatsLoading, cats } = useCats({ meta: { headers: { authorization: `Bearer ${getCookie('token')}` } } });

  if (isCatsLoading) return <p>Loading ...</p>;

  return (
    <div className="home_container">
      {cats?.cats?.map((cat: CatEntity) => (
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
