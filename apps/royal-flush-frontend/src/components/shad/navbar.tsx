import { Link } from 'react-router-dom';

export default function NavBar() {
  const token = localStorage.getItem('token');

  return (
    <>
      {token && (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">MyApp</span>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              {token ? (
                <>
                  <Link
                    to="/logout"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    Logout
                  </Link>
                  <Link
                    to="/profile"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
