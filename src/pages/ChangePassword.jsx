import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../reducers/userSlice";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {data,isLoading:passwordChangeLoading,error:changePasswordError} = useSelector((state)=>state.user.changePassword)
  const handleChangePassword = async(e) => {
    setError("")
    setSuccess("")
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return setError("New passwords do not match.");
    }
    const formData = {
      oldPassword:currentPassword, 
      newPassword:newPassword
    }
    try {
      await dispatch(changePassword(formData)).unwrap();
    } catch (error) {
      setError(error?.message)
    }

  };
   useEffect(()=>{
setSuccess(data?.message)
   },[data])
  return (
    <div className="min-h-screen bg-gray-100 text-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleChangePassword}
        className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Change Password
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Current Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Confirm New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            id="showPassword"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2 accent-blue-600 cursor-pointer"
          />
          <label htmlFor="showPassword" className="text-sm text-black">
            Show Passwords
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-semibold cursor-pointer"
        >
          {passwordChangeLoading?"Changing Password...":"Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
