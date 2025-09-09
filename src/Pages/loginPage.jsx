import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users/googlelogin`, {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success("Login Successful");
          if (res.data.role === "admin") navigate("/admin");
          else navigate("/");
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Google Login Failed");
        });
    },
    onError: () => {
      toast.error("Google Login Failed");
    },
  });

  function login() {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successful");
        if (res.data.role === "admin") navigate("/admin");
        else navigate("/");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login Failed");
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-200 px-6">
      <div className="w-full max-w-md bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center text-red-500">Login</h1>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <span className="text-sm">Email</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[45px] bg-slate-800/40 border border-white/20 rounded-xl px-3 placeholder-slate-400 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <span className="text-sm">Password</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[45px] bg-slate-800/40 border border-white/20 rounded-xl px-3 placeholder-slate-400 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>

        {/* Buttons */}
        <button
          onClick={login}
          className="w-full h-[45px] bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-xl font-medium"
        >
          Login
        </button>

        <button
          onClick={googleLogin}
          className="w-full h-[45px] bg-slate-700 hover:bg-slate-600 transition-all duration-300 rounded-xl flex items-center justify-center gap-2"
        >
          <img src="/GoogleLogo.png" className="w-6 h-6" /> Google
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-400 hover:text-red-300">
            Sign Up
          </Link>
        </p>
        <p className="text-sm text-center">
          <Link to="/forget" className="text-red-400 hover:text-red-300">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
