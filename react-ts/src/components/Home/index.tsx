import { memo, useEffect } from 'react';
import ContentItem from '../ContentItem';
import { useGetCatsQuery } from '../../graphql/generated/schemas';
import useToast from '../../hooks/useToast';

import './style.css';

type Data ={
  message: string;
}

const Home = () => {
  const { loading, data, refetch } = useGetCatsQuery();
  const toast = useToast();

  useEffect(() => {
    const sse = new EventSource('http://localhost:3001/cat/notifications');

    // eslint-disable-next-line no-shadow
    function getRealtimeData(data: Data) {
      toast.addToast({ type: 'success', title: data.message });
      refetch();
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => sse.close();
    return () => {
      sse.close();
    };
  }, [refetch, toast]);

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
