import './styles.css'
import { Link, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
export const homeClient = new QueryClient()
export const dashboardClient = new QueryClient()
export const HOME_AXIOS_CLIENT = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const DASHBOARD_AXIOS_CLIENT = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: Layout(),
    children: [
      { path: "/", element: <h1 className='text-red'>Home</h1> },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
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

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li className='text-red'>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
      <QueryClientProvider client={homeClient}>
        <Outlet />
        </QueryClientProvider>
      </main>
    </div>
  );
}


function DashboardLayout() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">A</Link>
            </li>
            <li>
              <Link to="/profile">Register</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
      <QueryClientProvider client={dashboardClient}>
        <Outlet />
        </QueryClientProvider>
      </main>
    </div>
  );
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default App;
