import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../reducers/authSlice";

const Login = () => {
  const {
    auth
  } = useSelector((state)=>state)
  useEffect(()=>{
     console.log("auth is ",auth);
  },[])
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" }); // identifier = username OR email
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const dispatch = useDispatch();
  const {data,error:loginError,isLoading:isLoginLoading} = useSelector((state)=>state.auth.login)

  // ---------- helpers ----------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrs = {};
    if (!form.username.trim())
      newErrs.username = "Username or email is required";
    if (!form.password) newErrs.password = "Password is required";
    return newErrs;
  };

  // ---------- submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    const foundErrs = validate();
    if (Object.keys(foundErrs).length) return setErrors(foundErrs);
   try {
     await dispatch(loginUser(form)).unwrap()
     navigate("/dashboard");
   } catch (error) {
     setServerError(loginError)
   }
  };

  // ---------- UI ----------
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold">
          Log in to your account
        </h2>

        {serverError && (
          <p className="rounded-md bg-red-100 p-2 text-center text-red-700">
            {serverError}
          </p>
        )}

        {/* Username / Email */}
        <div>
          <label className="block text-sm font-medium">Username or Email</label>
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

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border px-3 py-2 pr-10 outline-none focus:ring"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoginLoading}
          className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white disabled:opacity-60 cursor-pointer"
        >
          {isLoginLoading ? "Logging in…" : "Log In"}
        </button>

        {/* Switch to signup */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
