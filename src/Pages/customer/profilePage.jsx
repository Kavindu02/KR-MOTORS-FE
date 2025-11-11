import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
          navigate("/admin");
          return;
        }
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || "Failed to load profile";
        setError(errorMessage);
        toast.error(errorMessage);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const cardHover = {
    scale: 1.03,
  };

  // 🔹 Modified: no red background on hover
  const infoHover = {
    scale: 1.02,
    transition: { duration: 0.3 },
  };

  if (error)
    return (
      <motion.div
        className="flex justify-center items-center h-screen bg-slate-950 text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg">{error}</p>
      </motion.div>
    );

  if (!user)
    return (
      <motion.div
        className="flex justify-center items-center h-screen bg-slate-950 text-slate-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg animate-pulse">Loading profile...</p>
      </motion.div>
    );

  return (
    <motion.div
      className="min-h-screen flex justify-center items-start py-10 px-4 bg-slate-950 text-slate-200"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div
        className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-10"
        whileHover={cardHover}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="flex flex-col items-center">
          {user.image ? (
            <motion.img
              src={user.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-red-500 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <motion.div
              className="w-28 h-28 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold text-red-500 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {user.firstName?.charAt(0) || "U"}
              {user.lastName?.charAt(0) || "U"}
            </motion.div>
          )}
          <h1 className="mt-4 text-2xl font-bold text-red-500">
            {user.firstName} {user.lastName}
          </h1>
        </div>

        <div className="mt-8 space-y-4">
          {[
            { label: "First Name", value: user.firstName },
            { label: "Last Name", value: user.lastName },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone },
          ].map(({ label, value }) => (
            <motion.div
              key={label}
              className="flex items-center bg-slate-700 rounded-2xl p-4 gap-2 cursor-default"
              whileHover={infoHover}
              transition={{ type: "tween" }}
            >
              <span className="font-semibold text-slate-300">{label} :</span>
              <span>{value || "Not Provided"}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}