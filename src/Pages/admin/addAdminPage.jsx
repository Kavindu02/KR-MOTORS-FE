import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddAdminAdminPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email || !firstName || !lastName) {
      toast.error("Email, First Name, and Last Name are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/create-admin",
        { email, firstName, lastName, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Admin Added Successfully");
      navigate("/admin/add-admin  ");
    } catch (err) {
      console.error("Error adding admin:", err);
      toast.error("Failed to add admin");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-auto p-6">
      <div className="w-full max-w-[600px] rounded-2xl shadow-2xl p-8 bg-slate-800/90 flex flex-col gap-6 text-white">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-4">
          Add New Admin
        </h2>

        {/* First Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">First Name *</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-white/20 h-[45px] rounded-lg px-3 
            bg-slate-900 text-slate-200 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Last Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Last Name *</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-white/20 h-[45px] rounded-lg px-3 
            bg-slate-900 text-slate-200 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter last name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/20 h-[45px] rounded-lg px-3 
            bg-slate-900 text-slate-200 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter admin email"
            required
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-white/20 h-[45px] rounded-lg px-3 
            bg-slate-900 text-slate-200 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter phone number (optional)"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 py-4">
          <Link
            to="/admin/add-admin"
            className="w-[200px] h-[50px] border-2 border-red-600 rounded-xl flex justify-center items-center hover:bg-red-500 hhover:bg-red-600 hover:text-white transition duration-300"
          >
            Cancel
          </Link>
          <Link
          to="/admin/add-admin"
            onClick={handleSubmit}
            className="cursor-pointer w-[200px] h-[50px] bg-red-600 rounded-xl flex justify-center items-center text-white text-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Add Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
