import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../assets/components/paginator";
import Loader from "../../assets/components/loader";
import toast from "react-hot-toast";

export default function OrdersPageAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [popupVisible, setPopupVisible] = useState(false);
  const [clickOrder, setClickOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [ordernotes, setOrderNotes] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/orders/${page}/${limit}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOrders(res.data.orders);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit]);

  const handleUpdateOrder = async () => {
    if (!clickOrder) return;

    try {
      // Use orderId instead of _id
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/orders/${clickOrder.orderId}`,
        {
          status: orderStatus,
          notes: ordernotes,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(res.data);
      toast.success("Order updated!");
      fetchOrders(); // Refresh orders
      setPopupVisible(false);
    } catch (err) {
      console.error("Update error:", err.response ? err.response.data : err.message);
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-slate-950 text-slate-200">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center text-xl font-semibold">
          <Loader />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-2xl rounded-2xl bg-slate-800/90 border border-slate-700">
            <table className="w-full text-slate-200 border-collapse border border-slate-700">
              <thead className="bg-slate-900 text-red-500">
                <tr>
                  <th className="p-3 text-left font-semibold border-b border-slate-700">Order ID</th>
                  <th className="p-3 text-left font-semibold border-b border-slate-700">Customer Name</th>
                  <th className="p-3 text-left font-semibold border-b border-slate-700">Email</th>
                  <th className="p-3 text-left font-semibold border-b border-slate-700">Address</th>
                  <th className="p-3 text-left font-semibold border-b border-slate-700">Phone</th>
                  <th className="p-3 text-left font-semibold border-b border-slate-700">Status</th>
                  <th className="p-3 text-left font-semibold border-b border-slate-700">Date</th>
                  <th className="p-3 text-right font-semibold border-b border-slate-700">Total</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-700 hover:-translate-y-1 hover:bg-red-500 hover:text-white transition-transform cursor-pointer"
                      onClick={() => {
                        setOrderStatus(order.status);
                        setOrderNotes(order.notes || "");
                        setClickOrder(order);
                        setPopupVisible(true);
                      }}
                    >
                      <td className="p-3">{order.orderId}</td>
                      <td className="p-3">{order.name}</td>
                      <td className="p-3">{order.email}</td>
                      <td className="p-3">{order.address}</td>
                      <td className="p-3">{order.phone}</td>
                      <td className="p-3">{order.status}</td>
                      <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="p-3 text-right font-medium text-slate-200">Rs {order.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-6 text-slate-400">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Popup */}
            {popupVisible && clickOrder && (
              <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-start z-50 overflow-y-auto py-8">
                <div className="w-[550px] bg-slate-800 rounded-2xl shadow-xl relative p-6 text-slate-200">
                  
                  {/* Close button */}
                  <button
                    className="absolute w-[35px] h-[35px] bg-red-600 text-white top-[-20px] right-[-20px] rounded-full cursor-pointer hover:bg-transparent hover:text-red-500 font-bold flex items-center justify-center"
                    onClick={() => setPopupVisible(false)}
                  >
                    ✕
                  </button>

                  <h2 className="text-2xl font-bold mb-4 text-red-500">
                    Order Details - {clickOrder.orderId}
                  </h2>
                  <p className="text-sm text-slate-300 mb-6">
                    Placed on: {new Date(clickOrder.date).toLocaleString()}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-slate-200">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-200">
                      <p><span className="font-medium">Name :  </span> {clickOrder.name}</p>
                      <p><span className="font-medium">Email :  </span> {clickOrder.email}</p>
                      <p><span className="font-medium">Phone :  </span> {clickOrder.phone}</p>
                      <p><span className="font-medium">Address :  </span> {clickOrder.address}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-slate-200">Order Status</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        clickOrder.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""
                      } ${
                        clickOrder.status === "completed" ? "bg-green-100 text-green-700" : ""
                      } ${
                        clickOrder.status === "cancelled" ? "bg-red-100 text-red-700" : ""
                      }`}
                    >
                      {clickOrder.status}
                    </span>
                    <select
                      className="ml-4 p-1 border rounded text-gray-700"
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-slate-200">Items</h3>
                    
                    <div className="space-y-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-slate-700 p-1 rounded">
                      {clickOrder.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 p-3 border rounded-lg shadow-sm bg-slate-700/40"
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-slate-200">{item.productName}</p>
                            <p className="text-sm text-slate-300">Qty: {item.qty}</p>
                          </div>
                          <p className="font-semibold text-slate-200">Rs. {item.price * item.qty}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-xl font-bold text-slate-200">Total</span>
                    <span className="text-xl font-bold text-blue-600">Rs. {clickOrder.total}</span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-600 hover:bg-red-700 transition duration-300"
                      onClick={handleUpdateOrder}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Paginator
              currentPage={page}
              totalPages={totalPages}
              setCurrentPage={setPage}
              limit={limit}
              setlimit={setLimit}
            />
          </div>
        </>
      )}
    </div>
  );
}
