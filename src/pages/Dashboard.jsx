import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/authSlice";
import { fetchUser } from "../reducers/userSlice";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError] = useState("")
  const {data,isLoading,isSuccess,error:fetchUserError } = useSelector((state) => state.user.fetchUser);
    const {isLoading:logoutLoading} = useSelector((state) => state.auth.logOut);
  const user = data.data;
  const getUser = async()=>{
   try {
    await dispatch(fetchUser()).unwrap();
   } catch (error) {
    setError(fetchUserError)
   }
  }
  useEffect(() => {
     getUser();
  }, []);

  const handleLogout = async() => {
   try {
     await dispatch(logoutUser()).unwrap();
     navigate("/");
   } catch (error) {
     //set toast message - error while logging out 
   }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
     return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CircularProgress/>
    </div>
  );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {user?.fullName || "Anonymous User"}
        </h2>
        <p className="text-gray-500 text-sm mb-4">@{user?.username}</p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Email:</span> {user?.email}
        </p>
        <p className="text-gray-700 mb-6">
          <span className="font-medium">Joined:</span>{" "}
          {formatDate(user?.createdAt)}
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleProfileClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
          >
            View Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer"
          >
            {logoutLoading?"Logging Out...":"Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
