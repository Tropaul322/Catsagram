import { useRoutes } from 'react-router-dom';
import routes from './router';

function App() {
  const content = useRoutes(routes);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{content}</>
  );
}

export default App;
