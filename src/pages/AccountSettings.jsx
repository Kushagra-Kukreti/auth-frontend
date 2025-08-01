import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateInfo } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const { data: userInfo, isLoading: userLoading ,error:fetchUserError} = useSelector(
    (state) => state.user.fetchUser.data
  );
  const { data, isLoading: updateLoading,error:updationError } = useSelector(
    (state) => state.user.updateInfo
  );
  const updatedData = data.data;
  const [user, setUser] = useState({ name: "", email: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [pageError,setPageError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      dispatch(fetchUser());
    } catch (error) {
      setPageError(fetchUserError)
    }
  }, []);

  useEffect(() => {
    setUser((prev) => {
      return {
        ...prev,
        name: userInfo?.fullName,
        email: userInfo?.email,
      };
    });
  }, [userInfo]);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("")
    try {
      await dispatch(updateInfo(user)).unwrap();
      setSuccess("Profile updated successfully");
    } catch (error) {
      setError(updationError);
    }
  };

  if (userLoading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading settings...</p>
    );
  if(pageError){
        return (
      <p className="text-center mt-10 text-gray-500">{pageError}</p>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Account Settings
        </h2>

        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            disabled={updateLoading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer"
          >
            {updateLoading ? "Updating profile..." : "Update Profile"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
