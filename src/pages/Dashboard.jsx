import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  logoutUser } from "../reducers/authSlice";
import { fetchUser } from "../reducers/userSlice";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data:user} = useSelector(state=>state.user.data)

  useEffect(()=>{console.log("user is ",user);
  },[])
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/")
  };

  const handleProfileClick = ()=>{
    navigate("/profile")
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading dashboard...</p>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {user?.fullName || user?.email || "User"} 🎉
        </h2>
        <p className="text-gray-600 mb-6">Email: {user?.email}</p>
        <div className="flex gap-1">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
        >
          Logout
        </button>
        <button
          onClick={handleProfileClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
        >
          Profile
        </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
