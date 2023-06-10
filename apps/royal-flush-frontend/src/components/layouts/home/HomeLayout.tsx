import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import NavBar from "../../shad/navbar";

export const homeClient = new QueryClient()
export function HomeLayout() {
    return (
      <div>
        {/* does this affect any speed or */}
        <Toaster />
        <header>
       <NavBar />
        </header>
        <main>
        <QueryClientProvider client={homeClient}>
          <Outlet />
          </QueryClientProvider>
        </main>
      </div>
    );
  }