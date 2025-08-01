import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser} from "../reducers/authSlice";
import { fetchUser } from "../reducers/userSlice";
import { Avatar } from "@mui/material";
 
const Profile = () => {
  const navigate = useNavigate();
  const { data: user,isLoading:loading } = useSelector((state) => state.user.fetchUser.data);
  const {data,error:logoutError,isLoading:isLogoutLoading} = useSelector((state)=>state.auth.logOut)
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  
   const getUser = async()=>{
   try {
    await dispatch(fetchUser()).unwrap();
   } catch (error) {
    setErr(fetchUserError)
   }
  }
  useEffect(() => {
     getUser();
  }, []);
   
  const handleLogout = async()=>{
   try {
     await dispatch(logoutUser()).unwrap()
     navigate("/login")
   } catch (error) {
     //set up a toast message
   }
  }
  // derived data
  const memberSince =
    user?.createdAt && new Date(user.createdAt).toLocaleDateString();

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        Loading…
      </div>
    );

  if (err)
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        {err}
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <Avatar 
        className="mx-auto" 
        alt={user?.fullName} 
        src={user?.avatar}
        sx={{ width: 70, height: 70 }}
        />

        {/* Name + username */}
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold">{user?.fullName}</h2>
          <p className="text-gray-500">@{user?.username}</p>
        </div>

        {/* Info grid */}
        <div className="mt-6 grid gap-4">
          <InfoRow label="Email" value={user?.email} />
          <InfoRow label="Member since" value={memberSince} />
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => navigate("/account-settings")}
            className="rounded-md border border-indigo-600 px-4 py-2 text-indigo-600 hover:bg-indigo-50 cursor-pointer"
          >
            Account Settings
          </button>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 cursor-pointer "
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

// simple sub‑component for consistency
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default Profile;
