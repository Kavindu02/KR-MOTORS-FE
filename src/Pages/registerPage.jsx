import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        formData
      );

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error); // 🔍 debug
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-200 px-6">
      <div className="w-full max-w-lg bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">Sign Up</h1>

        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <span className="text-sm">First Name</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="h-[45px] bg-slate-800/40 border border-white/20 rounded-xl px-3 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm">Last Name</span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="h-[45px] bg-slate-800/40 border border-white/20 rounded-xl px-3 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="h-[45px] bg-slate-800/40 border border-white/20 rounded-xl px-3 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm">Phone</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              className="h-[45px] bg-slate-800/40 border border-white/20 rounded-xl px-3 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="h-[45px] bg-slate-800/40 border border-white/20 rounded-xl px-3 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm">Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="h-[45px] bg-slate-800/40 border border-white/20 rounded-xl px-3 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="h-[45px] bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-xl font-medium"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already Have An Account?{" "}
          <Link to="/login" className="text-red-400 hover:text-red-300 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
