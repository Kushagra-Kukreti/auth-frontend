import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../reducers/authSlice";
import { EMAIL_VALIDATOR } from "../constants";
import { Avatar } from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    avatar:null,
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const {isLoading:loading} = useSelector(state=>state.auth.signUp)
  const avatarRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleAvatarClick = ()=>{
    avatarRef.current.click();
  }

  const handleUpload = (e)=>{
    const file = e.target.files[0];
    setForm({...form,avatar:file})
  }

  const validate = () => {
    const newErrs = {};
    if (!form.fullName.trim()) newErrs.fullName = "Full name is required";
    if (!form.username.trim()) newErrs.username = "Username is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrs.email = "Enter a valid email";
    if (form.password.length < 6)
      newErrs.password = "Password must be at least 6 characters";
    return newErrs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrs = validate();
    if (Object.keys(foundErrs).length) return setErrors(foundErrs);
    dispatch(signUpUser(form))
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold">Create your account</h2>
        <Avatar
        onClick={handleAvatarClick}
        className="mx-auto cursor-pointer" 
        alt="Upload your avatar"
        sx={{ width: 70, height: 70 }}
        />
        <input
        onChange={handleUpload}
        hidden
        type="file"
        ref={avatarRef}
        />
        {serverError && (
          <p className="rounded-md bg-red-100 p-2 text-center text-red-700">
            {serverError}
          </p>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring"
          />
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring"
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white disabled:opacity-60 cursor-pointer hover:bg-indigo-700"
        >
          {loading ? "Signing up…" : "Sign Up"}
        </button>

        {/* Switch to login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-indigo-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
