import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { FaSearch, FaTimes, FaFilter, FaCarSide, FaFacebookF, FaTiktok, FaEye } from "react-icons/fa";

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

function ProductCard({ product }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden h-full shadow-2xl group border border-white/10">
      <div className="relative h-56 bg-slate-700 overflow-hidden">
        <img 
          src={product.image || product.images?.[0] || "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80"} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
        
        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
            {product.category}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-red-500 font-bold text-2xl">
            Rs. {Number(product.price).toLocaleString()}
          </p>
          <Link to={`/product/${product.productId || product._id || product.id}`}>
            <motion.button
              className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye /> View
            </motion.button>
          </Link>
        </div>
      </div>
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
      <p className="text-slate-400">Loading products...</p>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sort, setSort] = useState("latest");

  const fetchProducts = async (searchTerm = "") => {
    try {
      setStatus("loading");
      const base = import.meta.env.VITE_BACKEND_URL || "";
      const url = searchTerm
        ? `${base}/products/search/${encodeURIComponent(searchTerm)}`
        : `${base}/products`;
      const res = await axios.get(url);
      setProducts(Array.isArray(res.data) ? res.data : (res.data?.products || []));
      setStatus("success");
    } catch (err) {
      console.error("fetchProducts error:", err);
      setProducts([]);
      setStatus("error");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    fetchProducts("");
  }, []);

  const [lo, hi] = useMemo(() => {
    const a = Number(minPrice) || 0;
    const b = Number(maxPrice) || 0;
    return a <= b ? [a, b] : [b, a];
  }, [minPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => (p.name || "").toLowerCase().includes(q));
    }

    list = list.filter((p) => {
      const price = Number(p.price) || 0;
      return price >= lo && price <= hi;
    });

    if (sort === "latest") list.sort((a, b) => Number(b.productId || b.id || 0) - Number(a.productId || a.id || 0));
    if (sort === "price-low-high") list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    if (sort === "price-high-low") list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));

    return list;
  }, [products, query, lo, hi, sort]);

  const resetFilters = () => {
    setQuery("");
    setMinPrice(0);
    setMaxPrice(50000);
    setSort("latest");
    fetchProducts("");
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-slate-900 text-slate-100"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={slideIn}
    >
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1508328991403-28528188c065?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHZlaGljbGVzfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600"
            alt="Auto Parts"
            className="w-full h-full object-cover"
            loading="eager"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-red-900/40"></div>
          
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

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-wide"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 40px rgba(239, 68, 68, 0.3)",
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Our <span className="text-red-500">Products</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-slate-200 leading-relaxed font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Browse our wide range of <span className="text-red-400 font-semibold">genuine vehicle parts</span> and accessories
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto w-full">
        
        {/* SIDEBAR FILTER */}
        <motion.aside
          className="lg:w-80 h-fit lg:sticky lg:top-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-white/10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <FaFilter className="text-red-500 text-xl" />
            <span className="text-2xl font-extrabold text-white">Filters</span>
          </div>

          {/* Search */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Search</label>
            <div className="relative mb-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchProducts(query)}
                placeholder="Search products..."
                className="w-full border border-white/20 rounded-xl px-4 py-3 pl-11 outline-none bg-slate-800/50 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <motion.button
              onClick={() => fetchProducts(query)}
              className="w-full px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Search
            </motion.button>
          </div>

          {/* Sort */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-white/20 rounded-xl px-4 py-3 outline-none bg-slate-800/50 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Price Range</label>
            <div className="flex gap-3 mb-2">
              <input
                type="number"
                value={minPrice}
                min={0}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder="Min"
                className="w-1/2 border border-white/20 rounded-xl px-3 py-2 outline-none bg-slate-800/50 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
              />
              <input
                type="number"
                value={maxPrice}
                min={0}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                placeholder="Max"
                className="w-1/2 border border-white/20 rounded-xl px-3 py-2 outline-none bg-slate-800/50 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
              />
            </div>
            <p className="text-xs text-slate-400">
              Rs.{lo.toLocaleString()} – Rs.{hi.toLocaleString()}
            </p>
          </div>

          <motion.button
            onClick={resetFilters}
            className="w-full px-4 py-3 rounded-xl border-2 border-white/20 text-slate-200 font-semibold hover:bg-red-500 hover:border-red-500 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reset Filters
          </motion.button>
        </motion.aside>

        {/* PRODUCTS GRID */}
        <main className="flex-1">
          <div className="mb-6">
            <p className="text-slate-400">
              Showing <span className="text-white font-semibold">{filteredProducts.length}</span> products
            </p>
          </div>

          {status === "loading" ? (
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
          ) : status === "error" ? (
            <motion.p 
              className="text-red-500 text-center mt-10 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Failed to load products.
            </motion.p>
          ) : filteredProducts.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-slate-400 text-lg mb-4">No products found</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {filteredProducts.map((p, index) => (
                <motion.div
                  key={p.productId || p._id || index}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-10"
                    whileHover={{ left: "150%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 relative overflow-hidden mt-12">
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