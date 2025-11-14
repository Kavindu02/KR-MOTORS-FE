import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaShoppingCart, FaBolt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { addToCart } from "../../utils/cart"; // ✅ cart functions import

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

function getPid(p) {
  return p?.productId || p?._id || p?.id;
}

function clampQty(n) {
  const x = Math.floor(Number(n));
  if (Number.isNaN(x) || x < 1) return 1;
  if (x > 999) return 999;
  return x;
}

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);
  const validImages = images && images.length > 0 ? images : ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"];

  const next = () => setCurrent((current + 1) % validImages.length);
  const prev = () => setCurrent((current - 1 + validImages.length) % validImages.length);

  return (
    <div className="relative w-full">
      <motion.div 
        className="relative h-72 sm:h-96 bg-slate-800 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={validImages[current]} alt="Product" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        {validImages.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition">
              <FaChevronLeft />
            </button>
            <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition">
              <FaChevronRight />
            </button>
          </>
        )}
      </motion.div>
      {validImages.length > 1 && (
        <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-4 overflow-x-auto scrollbar-hide">
          {validImages.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${i === current ? "border-red-500" : "border-white/20"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

function Loader() {
  return (
    <motion.div className="flex flex-col items-center gap-4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
      <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400">Loading product...</p>
    </motion.div>
  );
}

export default function ProductOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [adding, setAdding] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setStatus("loading");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
        setQty(1);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load product");
        setStatus("error");
      });
  }, [id]);

  async function handleAddToCart() {
    if (!product) return;
    try {
      setAdding(true);
      await addToCart(product, qty);
      toast.success("Product added to cart");
    } catch (e) {
      toast.error("Failed to add to cart");
      console.error(e);
    } finally {
      setAdding(false);
    }
  }

  function handleBuyNow() {
    if (!product) return;
    const pid = getPid(product);
    navigate("/checkout", {
      state: {
        items: [
          {
            productId: pid,
            quantity: qty,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || product.image,
          },
        ],
      },
    });
  }

  if (status === "loading") {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><Loader /></div>;
  }

  if (status === "error" || !product) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">Error loading product</p>
          <Link to="/shop" className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const discount = product.labellPrice > product.price ? Math.round(((product.labellPrice - product.price) / product.labellPrice) * 100) : 0;
  const buttonTap = { scale: 0.95 };

  return (
    <motion.div className="flex flex-col min-h-screen bg-slate-900 text-slate-100" initial="hidden" animate="show" exit="hidden" variants={slideIn}>
      {/* Breadcrumb */}
      <div className="bg-slate-950 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-red-500 transition">Shop</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <ImageSlider images={product.images || [product.image]} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
              {product.category && <div className="inline-block px-3 sm:px-4 py-1 bg-red-500/20 text-red-500 rounded-full text-xs sm:text-sm font-semibold">{product.category}</div>}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{product.name}</h1>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{product.description}</p>

              {/* Price */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 sm:p-6 border border-white/10">
                {discount > 0 ? (
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="text-2xl sm:text-3xl font-extrabold text-red-500">Rs. {product.price.toLocaleString()}</span>
                    <span className="text-sm sm:text-lg text-slate-400 line-through">Rs. {product.labellPrice.toLocaleString()}</span>
                    <span className="px-2 sm:px-3 py-1 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-full">{discount}% OFF</span>
                  </div>
                ) : (
                  <span className="text-2xl sm:text-3xl font-extrabold text-red-500">Rs. {product.price.toLocaleString()}</span>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 sm:mb-3">Quantity</label>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-1">
                    <motion.button onClick={() => setQty(q => clampQty(q - 1))} className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-slate-700 hover:bg-red-500 flex items-center justify-center text-white transition-colors" whileHover={{ scale: 1.05 }} whileTap={buttonTap}><FaMinus /></motion.button>
                    <input type="number" value={qty} onChange={(e) => setQty(clampQty(e.target.value))} className="w-12 sm:w-16 h-8 sm:h-10 text-center bg-transparent text-white font-bold text-sm sm:text-lg outline-none" min={1} max={999} />
                    <motion.button onClick={() => setQty(q => clampQty(q + 1))} className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-slate-700 hover:bg-red-500 flex items-center justify-center text-white transition-colors" whileHover={{ scale: 1.05 }} whileTap={buttonTap}><FaPlus /></motion.button>
                  </div>
                  <div className="text-slate-400 text-sm sm:text-base">Subtotal: <span className="text-white font-bold">Rs. {(product.price * qty).toLocaleString()}</span></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button onClick={handleBuyNow} className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-xl hover:shadow-red-500/50 transition-all relative overflow-hidden group flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={buttonTap}>
                  <FaBolt /> Buy Now
                </motion.button>

                <motion.button onClick={handleAddToCart} disabled={adding} className={`flex-1 px-6 sm:px-8 py-3 sm:py-4 border-2 border-red-500 text-white font-bold rounded-full shadow-xl transition-all ${adding ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500"} flex items-center justify-center gap-2`} whileHover={!adding ? { scale: 1.02 } : {}} whileTap={!adding ? buttonTap : {}}>
                  <FaShoppingCart /> {adding ? "Adding..." : "Add to Cart"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
