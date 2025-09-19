import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function sendOTP() {
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
      toast.error("Failed to send OTP");
    }
  }

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
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
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950 flex justify-center items-center px-4 text-white">
      {!emailSent ? (
        <div className="w-[500px] h-[580px] bg-slate-900/80 rounded-[30px] shadow-xl flex flex-col items-center justify-center gap-6 p-8">
          <h1 className="text-3xl font-bold text-red-500">Reset Password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-[350px] h-[45px] border border-white/20 rounded-lg px-3 bg-slate-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOTP}
            className="w-[350px] h-[45px] bg-red-600 rounded-xl text-white text-lg mt-4 hover:bg-red-700 transition-all duration-300"
          >
            Send OTP
          </button>
          <p className="mt-4 text-sm text-center">
            Already Have An Account?{" "}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 underline"
            >
              Login
            </Link>
          </p>
        </div>
      ) : (
        <div className="w-[500px] h-[580px] bg-slate-800/90 rounded-[30px] shadow-xl flex flex-col items-center justify-center gap-5 p-8">
          <h1 className="text-3xl font-bold text-red-500">Verify OTP</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-[350px] h-[45px] border border-white/20 rounded-lg px-3 bg-slate-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="w-[350px] h-[45px] border border-white/20 rounded-lg px-3 bg-slate-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-[350px] h-[45px] border border-white/20 rounded-lg px-3 bg-slate-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={resetPassword}
            className="w-[350px] h-[45px] bg-red-600 rounded-xl text-white text-lg mt-4 hover:bg-red-700 transition-all duration-300"
          >
            Reset Password
          </button>
          <p className="mt-4 text-sm text-center">
            Already Have An Account?{" "}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 underline"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
