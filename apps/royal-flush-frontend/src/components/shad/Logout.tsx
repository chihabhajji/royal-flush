// components/Logout.js
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    toast('Good Job!', {
        icon: '👏',
      });
    navigate('/login');
  };

  return (
    // auto execute handleLogout on mount
    // button that you press it executes handleLogout
    <div className="flex justify-center items-center h-screen">
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Logout
        </button>
    </div>
    
  );
}
