import { memo } from 'react';
import ContentItem from '../ContentItem';
import { useGetCatsQuery } from '../../graphql/generated/schemas';

import './style.css';

const Home = () => {
  const { loading, data } = useGetCatsQuery();

  if (loading) return <p>Loading ...</p>;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className="home_container">
      {data?.cats.map((cat) => (
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
