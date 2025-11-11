import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCarSide, FaEnvelope, FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";

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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ForgetPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function sendOTP() {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending OTP to:", email);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/send-otp",
        { email }
      );
      console.log(res.data);
      toast.success("OTP sent successfully");
      setEmailSent(true);
    } catch (err) {
      console.error(
        "Send OTP error:",
        err.response ? err.response.data : err.message
      );
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/reset-password",
        { email, otp, newPassword }
      );
      console.log(res.data);
      toast.success("Password reset successfully");
      setEmailSent(false);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(
        "Reset password error:",
        err.response ? err.response.data : err.message
      );
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-950 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.img
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&auto=format"
          alt="Car dashboard"
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

      {/* Reset Password Card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-6"
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
                {!emailSent ? "Reset Password" : "Verify OTP"}
              </motion.h2>
              <p className="text-slate-400 text-sm">
                {!emailSent 
                  ? "Enter your email to receive OTP" 
                  : "Enter the OTP sent to your email"}
              </p>
            </motion.div>

            {/* Form Content */}
            <motion.div
              className="space-y-5"
              variants={fadeInUp}
              initial="hidden"
              animate="show"
            >
              {!emailSent ? (
                <>
                  {/* Email Input */}
                  <motion.div
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendOTP()}
                        className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 pointer-events-none"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </div>
                  </motion.div>

                  {/* Send OTP Button */}
                  <motion.button
                    onClick={sendOTP}
                    disabled={loading}
                    className={`w-full h-12 font-semibold rounded-xl text-white relative overflow-hidden group ${
                      loading ? "cursor-not-allowed" : ""
                    }`}
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
                          Sending...
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </span>
                  </motion.button>
                </>
              ) : (
                <>
                  {/* OTP Input */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      OTP Code
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaKey className="text-slate-400 group-hover:text-red-500 transition-colors duration-300" />
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                        placeholder="Enter OTP"
                      />
                    </div>
                  </motion.div>

                  {/* New Password */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      New Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaLock className="text-slate-400 group-hover:text-red-500 transition-colors duration-300" />
                      </div>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-red-500 transition-colors duration-300"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && resetPassword()}
                        className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                        placeholder="Confirm new password"
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

                  {/* Reset Password Button */}
                  <motion.button
                    onClick={resetPassword}
                    disabled={loading}
                    className={`w-full h-12 font-semibold rounded-xl text-white relative overflow-hidden group ${
                      loading ? "cursor-not-allowed" : ""
                    }`}
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
                          Resetting...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </span>
                  </motion.button>
                </>
              )}

              {/* Links */}
              <div className="text-center text-sm mt-6">
                <p className="text-slate-400">
                  Remember your password?{" "}
                  <Link to="/login" className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300">
                    Login
                  </Link>
                </p>
              </div>
            </motion.div>
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