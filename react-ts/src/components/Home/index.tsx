import { memo, useEffect, useState } from "react";
import ContentItem from "../ContentItem";
import { useGetCatsQuery } from "../../graphql/generated/schemas";

import "./style.css";

const Home = () => {
  const { loading, data, refetch } = useGetCatsQuery();
  const [message, setMessage] = useState({});

  useEffect(() => {
    const sse = new EventSource("http://localhost:3001/cat/notifications");

    function getRealtimeData(data: object) {
      setMessage(data);
      refetch();
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => sse.close();
    return () => {
      sse.close();
    };
  }, [refetch]);

  if (loading) return <p>Loading ...</p>;

  console.log(data);

  return (
    <div className="home_wrapper">
      <div className="header">
        <h1>Welcome, here's our cat gallery</h1>
        <span className="header_description">
          If you like one of the cat you can click "Like" button
        </span>
      </div>
      <div className="home_content">
        {data?.cats.map((cat) => (
          <ContentItem
            key={cat.id + cat.url}
            id={cat.id}
            url={cat.url}
            likes={cat.likes}
            createdAt={undefined}
            updatedAt={undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Home);
