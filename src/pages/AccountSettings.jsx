import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../reducers/userSlice';

const AccountSettings = () => {
  const {data:userInfo} = useSelector(state=>state.user.data)
  const [user, setUser] = useState({ name:'',email:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch()
  useEffect(()=>{dispatch(fetchUser())},[])

  useEffect(()=>{
    setUser((prev)=>{
      return {
        ...prev,
        name:userInfo?.fullName,
        email:userInfo?.email
      }
    })
  },[userInfo])

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.put("/api/users/update", user, {
        withCredentials: true,
      });
      setSuccess("Account updated successfully!");
    } catch (err) {
      setError("Failed to update account.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading settings...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
        
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
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Update Profile
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => alert("Redirect to password update")}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
