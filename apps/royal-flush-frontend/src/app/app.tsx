// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link, createBrowserRouter, RouterProvider, Outlet, BrowserRouter } from 'react-router-dom';
import Login from './pages/login';

export function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      {/* 1️⃣ Wrap your routes in a pathless layout route */}
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>)
}

function Layout() {
  return (
    <>
      <header>
        <h1>My Super Cool App</h1>
        {/* <NavMenu /> */}
      </header>
      <main>
        {/* 2️⃣ Render the app routes via the Layout Outlet */}
        <Outlet />
      </main>
      <footer>©️ me 2023</footer>
    </>
  );
}
export default App;
