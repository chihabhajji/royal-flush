import useSession from '../../hooks/useSession';

const Profile = () => {
  const {userData} = useSession({
    redirectTo: '/login',
    redirectIfFound: false,
    redirectIfNotFound: true,
  })
  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-2xl mx-auto rounded-md shadow-md overflow-hidden ">
        <div className="flex justify-center items-center w-full bg-teal-500 py-8">
          <div className="text-center">
            <h2 className="text-white text-3xl font-semibold">Welcome to your profile</h2>
            <p className="mt-2 text-white text-sm">Manage your account details here.</p>
          </div>
        </div>

        <div className="bg-white py-6 px-8">
          <h3 className="text-2xl font-medium text-gray-700">User details:</h3>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <pre className="text-sm text-gray-500">{JSON.stringify(userData, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
