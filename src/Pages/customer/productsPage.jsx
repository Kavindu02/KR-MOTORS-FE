import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

// Inline ProductCard (kept from your old important UI)
function ProductCard({ product, className = "" }) {
  return (
    <div className={`bg-slate-800 rounded-2xl overflow-hidden h-full shadow-xl group ${className}`}>
      <div className="relative h-48 bg-slate-700 overflow-hidden">
        <img 
          src={product.image || "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80"} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-red-500 font-bold text-xl">Rs. {Number(product.price).toLocaleString()}</p>
      </div>
    </div>
  );
}

// Inline Loader (kept)
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

  // Fetch function (uses backend search endpoint if query provided)
  const fetchProducts = async (searchTerm = "") => {
    try {
      setStatus("loading");
      const base = import.meta.env.VITE_BACKEND_URL || "";
      const url = searchTerm
        ? `${base}/products/search/${encodeURIComponent(searchTerm)}`
        : `${base}/products`;
      const res = await axios.get(url);
      // Expecting res.data to be array of products
      setProducts(Array.isArray(res.data) ? res.data : (res.data?.products || []));
      setStatus("success");
    } catch (err) {
      console.error("fetchProducts error:", err);
      setProducts([]);
      setStatus("error");
    }
  };

  useEffect(() => {
    // initial load
    fetchProducts("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className="flex flex-col min-h-screen bg-slate-950 text-slate-200"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {/* ANIMATED HEADER (kept original look) */}
      <section className="relative bg-slate-950 py-24 text-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-red-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
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

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-wide"
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: [
                "0 0 20px rgba(239, 68, 68, 0.5)",
                "0 0 40px rgba(239, 68, 68, 0.3)",
                "0 0 20px rgba(239, 68, 68, 0.5)",
              ]
            }}
            transition={{ duration: 0.8, textShadow: { duration: 2, repeat: Infinity } }}
          >
            OUR <span className="text-red-500">PRODUCTS</span>
          </motion.h1>
          <motion.p
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Browse our wide range of <span className="text-red-400 font-semibold">genuine vehicle parts</span> and accessories
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 gap-8 p-6 max-w-7xl mx-auto w-full">
        
        {/* SIDEBAR FILTER */}
        <motion.aside
          className="w-80 h-fit sticky top-6 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10"
          variants={fadeInUp}
          initial="hidden"
          animate="show"
        >
          <div className="flex items-center gap-3 mb-8">
            <FaFilter className="text-red-500 text-xl" />
            <span className="text-2xl font-extrabold text-white">Filters</span>
          </div>

          {/* Search */}
          <motion.div 
            className="flex flex-col gap-4 mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchProducts(query)}
                placeholder="Search products..."
                className="w-full border border-white/20 rounded-xl px-4 py-3 pl-11 outline-none bg-slate-800/50 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => fetchProducts(query)}
                className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Search
              </button>
              {query ? (
                <button
                  onClick={() => {
                    setQuery("");
                    fetchProducts("");
                  }}
                  className="px-3 py-2 rounded-xl border border-white/20 text-slate-200 hover:text-red-500 transition"
                >
                  <FaTimes />
                </button>
              ) : null}
            </div>
          </motion.div>

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

          {/* Price Filter */}
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset Filters
          </motion.button>
        </motion.aside>

        {/* PRODUCTS GRID */}
        <main className="flex-1">
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
            <motion.p 
              className="text-slate-400 text-center mt-10 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              No products found. Try adjusting your filters.
            </motion.p>
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
    </motion.div>
  );
}
