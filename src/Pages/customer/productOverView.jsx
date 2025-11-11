import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaShoppingCart, FaBolt, FaCarSide, FaFacebookF, FaTiktok, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
        className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={validImages[current]}
          alt="Product"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

        {validImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </motion.div>

      {validImages.length > 1 && (
        <div className="flex gap-3 mt-4 justify-center">
          {validImages.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? "border-red-500" : "border-white/20"
              }`}
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
    <motion.div 
      className="flex flex-col items-center gap-4"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400">Loading product...</p>
    </motion.div>
  );
}

export default function ProductOverviewPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [adding, setAdding] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setStatus("loading");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/products/${params.productId}`)
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
  }, [params.productId]);

  async function handleAddToCart() {
    if (!product) return;
    try {
      setAdding(true);
      // In real app: await addToCart(product, qty);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API
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
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (status === "error" || !product) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">Error loading product</p>
          <Link to="/shop" className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.labellPrice > product.price
    ? Math.round(((product.labellPrice - product.price) / product.labellPrice) * 100)
    : 0;

  const buttonTap = { scale: 0.95 };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-slate-900 text-slate-100"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={slideIn}
    >
      {/* Breadcrumb */}
      <div className="bg-slate-950 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-red-500 transition">Shop</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Left: Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ImageSlider images={product.images || [product.image]} />
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Category Badge */}
              {product.category && (
                <div className="inline-block px-4 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-semibold">
                  {product.category}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl font-extrabold text-white leading-tight">
                {product.name}
                {Array.isArray(product.altNames) && product.altNames.length > 0 && (
                  <span className="block text-xl font-light text-slate-300 mt-2">
                    {product.altNames.join(" | ")}
                  </span>
                )}
              </h1>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Price */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10">
                {discount > 0 ? (
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-3xl font-extrabold text-red-500">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      Rs. {product.labellPrice.toLocaleString()}
                    </span>
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                      {discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-extrabold text-red-500">
                    Rs. {product.price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-1">
                    <motion.button
                      onClick={() => setQty(q => clampQty(q - 1))}
                      className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={buttonTap}
                    >
                      <FaMinus />
                    </motion.button>

                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(clampQty(e.target.value))}
                      className="w-16 h-10 text-center bg-transparent text-white font-bold text-lg outline-none"
                      min={1}
                      max={999}
                    />

                    <motion.button
                      onClick={() => setQty(q => clampQty(q + 1))}
                      className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={buttonTap}
                    >
                      <FaPlus />
                    </motion.button>
                  </div>

                  <div className="text-slate-400">
                    Subtotal: <span className="text-white font-bold">Rs. {(product.price * qty).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  onClick={handleBuyNow}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-xl hover:shadow-red-500/50 transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={buttonTap}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaBolt /> Buy Now
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className={`flex-1 px-8 py-4 border-2 border-red-500 text-white font-bold rounded-full shadow-xl transition-all ${
                    adding ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500"
                  }`}
                  whileHover={!adding ? { scale: 1.02 } : {}}
                  whileTap={!adding ? buttonTap : {}}
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaShoppingCart />
                    {adding ? "Adding..." : "Add to Cart"}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
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

        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-2 font-bold text-white text-xl mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaCarSide className="w-8 h-8 text-red-500" />
              </motion.div>
              KR MOTORS
            </motion.div>
            <p className="text-sm opacity-80 leading-relaxed">
              We provide genuine vehicle parts and accessories, affordable prices,
              and trusted service with islandwide delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "HOME", path: "/" },
                { name: "SHOP", path: "/shop" },
                { name: "ABOUT", path: "/about" },
                { name: "CONTACT", path: "/contact" }
              ].map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link to={link.path} className="hover:text-red-500 transition duration-300 inline-block hover:translate-x-2">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Genuine Auto Parts",
                "Islandwide Delivery",
                "Warranty & Returns"
              ].map((service, i) => (
                <motion.li 
                  key={service}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <motion.span 
                    className="text-red-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    •
                  </motion.span>
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm mb-4">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="tel:+94704150080" className="hover:text-red-500 transition duration-300">+94 704150080</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="mailto:krmotorssl@gmail.com" className="hover:text-red-500 transition duration-300">krmotorssl@gmail.com</a>
              </motion.li>
            </ul>
            <div className="flex gap-3 text-white">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61557530297240"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@kr_motors_alawwa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition duration-300"
                whileHover={{ scale: 1.2, rotate: -360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FaTiktok />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center text-xs py-6 border-t border-white/10 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} KR MOTORS. All Rights Reserved.</p>
        </motion.div>
      </footer>
    </motion.div>
  );
}