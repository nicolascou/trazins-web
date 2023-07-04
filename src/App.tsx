import Layout from './components/Layout';
import Materiales from './components/Materiales';
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
      element: <Materiales />,
    },
  ]);

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
