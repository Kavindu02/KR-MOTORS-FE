import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../assets/components/loader";

export default function AdminAdminPage() {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/users/admins",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAdmins(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load admins");
      setAdmins([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (email) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL +
          "/users/admins/" +
          encodeURIComponent(email),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Admin deleted successfully");
      setAdmins((prev) => prev.filter((a) => a.email !== email));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto shadow-2xl rounded-2xl bg-slate-800/90 border border-slate-700">
          <table className="w-full text-left border-collapse text-slate-200">
            <thead>
              <tr className="bg-slate-900 text-red-500 text-sm uppercase">
                <th className="p-4">First Name</th>
                <th className="p-4">Last Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {admins.length > 0 ? (
                admins.map((admin, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-700 hover:bg-slate-700/40 transition-colors"
                  >
                    <td className="p-4 font-medium text-slate-200">
                      {admin.firstName}
                    </td>
                    <td className="p-4 font-medium text-slate-200">
                      {admin.lastName}
                    </td>
                    <td className="p-4 text-slate-400">{admin.email}</td>
                    <td className="p-4 text-slate-400">{admin.phone}</td>
                    <td className="p-4 flex items-center justify-center gap-3">
                      <Link
                        to="/admin/update-admin"
                        state={admin}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        <FaEdit size={16} /> Edit
                      </Link>
                      <BiTrash
                        className="bg-red-600 p-2 text-3xl rounded-full text-white shadow cursor-pointer hover:bg-red-700 transition"
                        onClick={() => handleDelete(admin.email)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-slate-400 font-medium"
                  >
                    No admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Link
        to="/admin/newadmin"
        className="fixed right-10 bottom-10 text-white bg-red-600 p-4 rounded-full shadow-xl hover:bg-red-700 transition"
      >
        <HiMiniPlusCircle className="text-5xl" />
      </Link>
    </div>
  );
}
