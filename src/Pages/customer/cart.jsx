import { useEffect, useState } from "react";
import { addToCart, getCart } from "../../utils/cart";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
      <div className="w-full h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <span className="animate-pulse">Loading cart…</span>
      </div>
    );
  }

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hover: { y: -5, boxShadow: "0px 8px 15px rgba(255, 0, 0, 0.3)" },
  };

  const buttonTap = { scale: 0.95 };

  return (
    <motion.div
      className="w-full min-h-screen flex flex-col py-10 items-center bg-slate-950 text-slate-200"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {cart.length === 0 && (
        <div className="text-slate-400 mb-6">Your cart is empty.</div>
      )}

      {cart.map((item) => (
        <motion.div
          key={item.productId}
          className="w-[900px] h-[150px] m-[10px] shadow-xl flex flex-row items-center bg-slate-800 rounded-xl"
          variants={itemVariants}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-[80px] h-[80px] ml-[20px] object-cover rounded-md"
          />
          <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
            <span className="font-bold line-clamp-2">{item.name}</span>
            <span className="font-semibold text-red-500">
              Rs {(item.price).toFixed(2)}
            </span>
          </div>

          <div className="w-[190px] h-full flex flex-row justify-center items-center">
            <motion.button
              className="cursor-pointer text-3xl px-3 hover:text-red-500"
              onClick={() => handleQty(item, -1)}
              aria-label="Decrease quantity"
              whileTap={buttonTap}
              disabled={item.quantity <= 1}
            >
              -
            </motion.button>
            <span className="mx-[10px] text-xl">{item.quantity}</span>
            <motion.button
              className="cursor-pointer text-xl px-3 hover:text-red-500"
              onClick={() => handleQty(item, 1)}
              aria-label="Increase quantity"
              whileTap={buttonTap}
            >
              +
            </motion.button>
          </div>

          <div className="w-[190px] h-full flex justify-end items-center pr-[20px]">
            <span className="font-bold text-red-500">
              Rs {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>

          <motion.button
            className="w-[30px] h-[30px] bg-red-500 text-white font-bold hover:bg-red-600 cursor-pointer rounded-full mr-[20px] flex items-center justify-center"
            onClick={() => handleDelete(item)}
            aria-label="Remove item"
            title="Remove"
            whileTap={buttonTap}
          >
            <RiDeleteBin5Fill />
          </motion.button>
        </motion.div>
      ))}

      <motion.div
        className="w-[900px] h-[100px] m-[10px] shadow-xl flex flex-row items-center justify-end relative bg-slate-800 rounded-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-bold text-xl text-red-500 mr-[20px]">
          Total: Rs {total.toFixed(2)}
        </span>

        <motion.button
          className="absolute left-10 bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 cursor-pointer transition"
          onClick={() => {
            navigate("/checkout", { state: { items: cart } });
          }}
          whileTap={buttonTap}
        >
          Checkout
        </motion.button>
      </motion.div>
    </motion.div>
  );
}