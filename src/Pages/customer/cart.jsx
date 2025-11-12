import { useEffect, useState } from "react";
import { addToCart, getCart } from "../../utils/cart";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    let mounted = true;
    (async () => {
      try {
        const items = await getCart();
        if (mounted) setCart(items);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleQty(item, delta) {
    const updated = await addToCart(item, delta);
    setCart(updated);
  }

  async function handleDelete(item) {
    const updated = await addToCart(item, -item.quantity);
    setCart(updated);
  }

  const total = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-slate-200 text-lg font-medium">Loading your cart...</span>
        </motion.div>
      </div>
    );
  }

  // Animation variants
  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
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

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    exit: { 
      opacity: 0, 
      x: 100,
      transition: { duration: 0.3 }
    }
  };

  const buttonTap = { scale: 0.92 };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-slate-900 text-slate-100"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={slideIn}
    >
      {/* HERO SECTION - Same as HomePage */}
      <section className="relative bg-slate-950 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1617817236914-795f5a551eb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FydHN8ZW58MHx8MHx8fDA%3D"
            alt="Cart Background"
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

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-wide flex items-center justify-center gap-4"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 40px rgba(239, 68, 68, 0.3)",
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaShoppingCart className="text-red-500" />
              Your <span className="text-red-500">Shopping Cart</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed font-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Review your selected items and proceed to checkout
            <br />
            <span className="text-red-400 font-semibold">Genuine auto parts delivered to your doorstep</span>
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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

      {/* CART ITEMS SECTION - Same background as HomePage Features */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=100&q=50')",
            backgroundSize: "100px 100px"
          }}></div>
        </div>

        <motion.div
          className="relative max-w-6xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div
                key="empty"
                className="flex flex-col items-center justify-center gap-8 text-center py-12"
                variants={fadeInUp}
              >
                <motion.div
                  className="w-40 h-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-2xl"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaShoppingCart className="text-7xl text-red-500/50" />
                </motion.div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Your cart is <span className="text-red-500">empty</span>
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Add some quality auto parts to get started!
                  </p>
                </div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => navigate("/shop")}
                    className="inline-block px-12 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Shop Now</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="w-full">
                {cart.map((item, i) => (
                  <motion.div
                    key={item.productId}
                    className="relative mb-8 group"
                    variants={scaleIn}
                    custom={i}
                    layout
                  >
                    <motion.div
                      className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row items-center gap-6"
                      whileHover={{ 
                        y: -10,
                        boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Gradient border effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" 
                           style={{ padding: "2px" }}>
                        <div className="w-full h-full bg-slate-800 rounded-3xl"></div>
                      </div>

                      {/* Image with enhanced styling */}
                      <motion.div
                        className="relative z-10"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-28 h-28 object-cover rounded-2xl shadow-xl border-2 border-slate-700"
                        />
                      </motion.div>

                      {/* Product info */}
                      <div className="flex-1 text-center md:text-left relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{item.name}</h3>
                        <p className="text-red-500 text-xl font-semibold">Rs {item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-4 relative z-10">
                        <motion.button
                          className="w-12 h-12 flex items-center justify-center bg-slate-700/50 hover:bg-red-500/20 rounded-xl text-2xl font-bold text-slate-300 hover:text-red-400 border border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                          onClick={() => handleQty(item, -1)}
                          aria-label="Decrease quantity"
                          whileTap={buttonTap}
                          whileHover={{ scale: 1.1, rotate: -10 }}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </motion.button>
                        <motion.span
                          className="min-w-[3.5rem] text-center text-2xl font-bold text-white"
                          key={item.quantity}
                          initial={{ scale: 1.3, color: "#ef4444" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          className="w-12 h-12 flex items-center justify-center bg-slate-700/50 hover:bg-red-500/20 rounded-xl text-2xl font-bold text-slate-300 hover:text-red-400 border border-slate-600 shadow-lg"
                          onClick={() => handleQty(item, 1)}
                          aria-label="Increase quantity"
                          whileTap={buttonTap}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          +
                        </motion.button>
                      </div>

                      {/* Subtotal */}
                      <div className="min-w-[180px] text-center md:text-right relative z-10">
                        <motion.span
                          className="text-3xl font-bold text-red-500"
                          key={item.quantity * item.price}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          Rs {(item.price * item.quantity).toFixed(2)}
                        </motion.span>
                      </div>

                      {/* Delete button */}
                      <motion.button
                        className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center shadow-xl hover:shadow-red-500/50 relative z-10"
                        onClick={() => handleDelete(item)}
                        aria-label="Remove item"
                        title="Remove"
                        whileTap={{ scale: 0.9, rotate: -10 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <RiDeleteBin5Fill className="text-2xl" />
                      </motion.button>

                      {/* Shine effect */}
                      <motion.div
                        className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-0"
                        whileHover={{ left: "150%" }}
                        transition={{ duration: 0.8 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Total and Checkout */}
                <motion.div
                  className="mt-12 p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-3xl overflow-hidden relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Animated background pattern - same as footer */}
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

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => navigate("/checkout", { state: { items: cart } })}
                        className="inline-block px-12 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Proceed to Checkout</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </button>
                    </motion.div>

                    <div className="text-center md:text-right">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Total: <span className="text-red-500">Rs {total.toFixed(2)}</span>
                      </h2>
                      <p className="text-slate-300 text-sm">
                        {cart.length} {cart.length === 1 ? "item" : "items"} in cart
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  );
}