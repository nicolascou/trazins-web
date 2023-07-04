import Layout from './components/Layout';
import Registro from './components/Registro';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Registro />,
    },
    {
      path: '/material',
      element: <div>hola</div>,
    },
  ]);

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
