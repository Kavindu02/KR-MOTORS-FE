import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCarSide, FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        formData
      );

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-950 overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=80&auto=format"
          alt="Luxury car interior"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-red-900/50"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Register Card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-6"
        variants={scaleIn}
        initial="hidden"
        animate="show"
      >
        {/* Glass morphism card */}
        <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-10">
            {/* Logo and Title */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                className="flex items-center justify-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FaCarSide className="w-10 h-10 text-red-500" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white">KR MOTORS</h1>
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold text-white mb-2"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.3)",
                    "0 0 30px rgba(239, 68, 68, 0.5)",
                    "0 0 20px rgba(239, 68, 68, 0.3)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Create Account
              </motion.h2>
              <p className="text-slate-400 text-sm">Join us to get started</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {/* First Name & Last Name Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-slate-400 group-hover:text-red-500 transition-colors duration-300" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                        placeholder="First name"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Last Name */}
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-slate-400 group-hover:text-red-500 transition-colors duration-300" />
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-slate-400 group-hover:text-red-500 transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaPhone className="text-slate-400 group-hover:text-red-500 transition-colors duration-300" />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                      placeholder="Enter your phone"
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-slate-400 group-hover:text-red-500 transition-colors duration-300" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-red-500 transition-colors duration-300"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-slate-400 group-hover:text-red-500 transition-colors duration-300" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-red-500 transition-colors duration-300"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`w-full h-12 font-semibold rounded-xl text-white relative overflow-hidden group mt-6 ${
                    loading ? "cursor-not-allowed" : ""
                  }`}
                  variants={fadeInUp}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 ${loading ? "opacity-70" : ""}`}></div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: loading ? "-100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </span>
                </motion.button>

                {/* Links */}
                <motion.div
                  className="text-center text-sm mt-6"
                  variants={fadeInUp}
                >
                  <p className="text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300">
                      Login
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            </form>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            animate={{ left: ["150%", "-150%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
        </div>

        {/* Back to Home Link */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link 
            to="/" 
            className="text-slate-400 hover:text-white transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
          >
            <motion.span
              animate={{ x: [-5, 0, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            fill="rgba(239, 68, 68, 0.1)"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,234.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,234.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,133.3C672,128,768,160,864,181.3C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,234.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}