import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";

export const dashboardClient = new QueryClient();
export function DashboardLayout() {

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