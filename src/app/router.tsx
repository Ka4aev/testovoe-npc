import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { CitizenProfilePage, DashboardPage, NotFoundPage, RegistryPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'registry',
        element: <RegistryPage />,
      },
      {
        path: 'citizens/:id',
        element: <CitizenProfilePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
