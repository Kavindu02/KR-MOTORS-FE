import { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setName(res.data.firstName + " " + res.data.lastName);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to fetch user details.");
          navigate("/login");
        });
    }
  }, [navigate]);

  const [cart, setCart] = useState(location.state?.items || []);

  useEffect(() => {
    if (!location.state?.items) {
      toast.error("Please select items to checkout");
      navigate("/shop");
    }
  }, [location.state, navigate]);

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function handleQtyChange(index, delta) {
    const newCart = [...cart];
    if (delta < 0 && newCart[index].quantity <= 1) return;
    newCart[index].quantity += delta;
    setCart(newCart);
  }

  function handleDelete(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    if (newCart.length === 0) {
      toast.error("Cart is empty");
      navigate("/shop");
    }
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    if (!name || !address || !phone) {
      toast.error("Please fill all the details");
      return;
    }

    const order = {
      address,
      phone,
      items: cart.map((item) => ({
        productId: item.productId,
        qty: item.quantity,
      })),
    };

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/orders", order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order placed successfully");
      navigate("/");
    } catch {
      toast.error("Error placing order");
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 border-3 border-red-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-slate-200">Loading checkout...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60"
            alt="Checkout Background"
            className="w-full h-full object-cover"
            loading="eager"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-red-900/40"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-white tracking-wide flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 40px rgba(239, 68, 68, 0.3)",
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaShoppingCart className="text-red-500 text-4xl sm:text-5xl lg:text-6xl" />
              <span className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-red-500">Checkout</span>
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-2xl text-slate-200 mb-6 sm:mb-10 leading-relaxed font-light px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Complete your order and get your parts delivered
            <br className="hidden sm:block" />
            <span className="text-red-400 font-semibold">Fast & secure checkout process</span>
          </motion.p>
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <motion.div
          className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Checkout Content */}
      <section className="py-8 sm:py-10 md:py-12 bg-slate-900 flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Order Items</h2>
            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div
                  key={item.productId}
                  className="relative p-4 md:p-6 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl md:rounded-3xl" 
                       style={{ padding: "2px" }}>
                    <div className="w-full h-full bg-slate-800 rounded-2xl md:rounded-3xl"></div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
                    {/* Image and Product Info */}
                    <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl md:rounded-2xl shadow-xl border-2 border-slate-700"
                        />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 sm:truncate">{item.name}</h3>
                        <p className="text-red-500 font-medium text-sm sm:text-base">Rs {item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Controls Section */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-slate-700/50 hover:bg-red-500/20 rounded-lg sm:rounded-xl text-white hover:text-red-400 border border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base"
                          onClick={() => handleQtyChange(index, -1)}
                          disabled={item.quantity <= 1}
                          whileTap={{ scale: 0.92 }}
                          whileHover={{ scale: 1.1, rotate: -10 }}
                        >
                          −
                        </motion.button>
                        <motion.span
                          className="w-8 sm:w-10 text-center font-semibold text-white text-sm sm:text-base"
                          key={item.quantity}
                          initial={{ scale: 1.3, color: "#ef4444" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-slate-700/50 hover:bg-red-500/20 rounded-lg sm:rounded-xl text-white hover:text-red-400 border border-slate-600 shadow-lg text-sm sm:text-base"
                          onClick={() => handleQtyChange(index, 1)}
                          whileTap={{ scale: 0.92 }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          +
                        </motion.button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[80px] sm:min-w-[100px]">
                        <motion.span
                          className="text-lg sm:text-xl font-bold text-red-500"
                          key={item.quantity * item.price}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          Rs {(item.price * item.quantity).toFixed(2)}
                        </motion.span>
                      </div>

                      {/* Delete */}
                      <motion.button
                        className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl hover:shadow-red-500/50"
                        onClick={() => handleDelete(index)}
                        aria-label="Remove item"
                        whileTap={{ scale: 0.9, rotate: -10 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <RiDeleteBin5Fill className="text-base sm:text-lg" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-0"
                    whileHover={{ left: "150%" }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Delivery Details */}
          <motion.div
            className="mb-8 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-2xl md:rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full h-12 sm:h-14 bg-slate-700 text-slate-200 border border-slate-600 rounded-xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition text-sm sm:text-base"
                  type="text"
                  placeholder="Enter Your Name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Phone Input */}
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full h-12 sm:h-14 bg-slate-700 text-slate-200 border border-slate-600 rounded-xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition text-sm sm:text-base"
                  type="text"
                  placeholder="Enter Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Address Input - Full Width */}
              <div className="relative md:col-span-2">
                <FaMapMarkerAlt className="absolute left-4 top-6 text-slate-400" />
                <textarea
                  className="w-full min-h-[100px] bg-slate-700 text-slate-200 border border-slate-600 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition resize-none text-sm sm:text-base"
                  placeholder="Enter Your Complete Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(45deg, #ef4444 25%, transparent 25%, transparent 75%, #ef4444 75%, #ef4444), linear-gradient(45deg, #ef4444 25%, transparent 25%, transparent 75%, #ef4444 75%, #ef4444)",
                  backgroundSize: "60px 60px",
                  backgroundPosition: "0 0, 30px 30px"
                }}
                animate={{
                  backgroundPosition: ["0px 0px, 30px 30px", "60px 60px, 90px 90px"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10">
              {/* Place Order Button */}
              <motion.div
                className="w-full sm:w-auto order-2 sm:order-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={placeOrder}
                  className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 relative overflow-hidden group text-sm sm:text-base"
                >
                  <span className="relative z-10">Place Order</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </motion.div>

              {/* Total */}
              <div className="text-center sm:text-right order-1 sm:order-2">
                <p className="text-slate-400 text-xs sm:text-sm mb-1">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Total: <span className="text-red-500">Rs {getTotal().toFixed(2)}</span>
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}