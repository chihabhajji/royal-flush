import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles.css';

import Login from './pages/login';
import Profile from './pages/profile';
import Register from './pages/register';

import { HomeLayout } from '../components/layouts/home/HomeLayout';
import Logout from '../components/shad/Logout';
import { DashboardLayout } from '../components/layouts/dashboard/DashboardLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: HomeLayout(),
    children: [
      { path: "/", element: <h1 className='text-red'>Home</h1> },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/profile", Component: Profile},
      { path: "/logout", Component: Logout}
      // { path: "/dashboard/*", Component: Login}
    ],
  },
  {
    path: "/dashboard",
    element: DashboardLayout(),
    children: [
      // { path: "/", element: <h1>Dashboard</h1> },
      // { path: "/profile", element: <h1>Profile</h1> },
      // { path: "/settings", element: <h1>Settings</h1> },
    ],
  }
]);

export function App() {
  return (<RouterProvider router={router} fallbackElement={<p>Loading...</p>} />);
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default App;
