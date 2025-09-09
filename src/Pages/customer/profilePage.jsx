import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("No token found, please login first");
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        if (data.role === "admin") {
          toast.error("Admins cannot access this page");
          navigate("/admin");
          return;
        }
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || "Failed to load profile";
        setError(errorMessage);
        toast.error(errorMessage);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950 text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950 text-slate-200">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4 bg-slate-950 text-slate-200">
      <div className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-10">
        <div className="flex flex-col items-center">
          {user.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-red-500 shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold text-red-500 shadow-lg">
              {user.firstName?.charAt(0) || "U"}
              {user.lastName?.charAt(0) || "U"}
            </div>
          )}
          <h1 className="mt-4 text-2xl font-bold text-red-500">
            {user.firstName} {user.lastName}
          </h1>
         
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center bg-slate-700 rounded-2xl p-4 gap-2">
            <span className="font-semibold text-slate-300">First Name :</span>
            <span className="text-slate-200">{user.firstName || "Not Provided"}</span>
          </div>
          <div className="flex items-center bg-slate-700 rounded-2xl p-4 gap-2">
            <span className="font-semibold text-slate-300">Last Name : </span>
            <span className="text-slate-200">{user.lastName || "Not Provided"}</span>
          </div>
          <div className="flex items-center bg-slate-700 rounded-2xl p-4 gap-2">
            <span className="font-semibold text-slate-300">Email : </span>
            <span className="text-slate-200">{user.email || "Not Provided"}</span>
          </div>
          <div className="flex items-center bg-slate-700 rounded-2xl p-4 gap-2">
            <span className="font-semibold text-slate-300">Phone : </span>
            <span className="text-slate-200">{user.phone || "Not Provided"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
