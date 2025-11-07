import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../assets/components/productCard";
import Loader from "../../assets/components/loader";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("latest");

  const fetchProducts = async (searchTerm = "") => {
    try {
      setStatus("loading");
      const url = searchTerm
        ? `${import.meta.env.VITE_BACKEND_URL}/products/search/${encodeURIComponent(searchTerm)}`
        : `${import.meta.env.VITE_BACKEND_URL}/products`;
      const res = await axios.get(url);
      setProducts(res.data || []);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  useEffect(() => {
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

    if (sort === "latest") list.sort((a, b) => Number(b.productId || 0) - Number(a.productId || 0));
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
      {/* HEADER */}
      <section className="bg-slate-900/80 py-16 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">OUR PRODUCT</h1>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Browse our wide range of vehicle parts and accessories
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 gap-10 p-6 text-red-500">
        
        {/* SIDEBAR FILTER */}
        <aside className="w-[320px] h-full border-r border-white/10 bg-slate-900/70 backdrop-blur-sm p-7 flex flex-col gap-10">
          <span className="block text-2xl font-extrabold text-slate-200">Filters</span>

          {/* Search */}
          <div className="flex flex-col gap-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProducts(query)}
              placeholder="Search products..."
              className="w-full border border-white/20 rounded-xl px-3 py-2 outline-none bg-slate-800 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
            <button
              onClick={() => fetchProducts(query)}
              className="w-full px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              Search
            </button>
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  fetchProducts("");
                }}
                className="text-xs text-slate-400 hover:text-red-500 transition"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Price Filter */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice}
                min={0}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder="Min"
                className="w-1/2 border border-white/20 rounded-xl px-3 py-2 outline-none bg-slate-800 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
              />
              <input
                type="number"
                value={maxPrice}
                min={0}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                placeholder="Max"
                className="w-1/2 border border-white/20 rounded-xl px-3 py-2 outline-none bg-slate-800 text-slate-200 focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
              />
            </div>
            <p className="text-xs text-slate-400">
              Price range: Rs.{lo.toLocaleString()} – Rs.{hi.toLocaleString()}
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="w-full px-4 py-2 rounded-xl border border-white/20 text-slate-200 hover:bg-slate-800 transition"
          >
            Reset filters
          </button>
        </aside>

        {/* PRODUCTS GRID */}
        <main
          className="flex-1 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }} // Firefox support
        >
          {status === "loading" ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : status === "error" ? (
            <p className="text-red-500 text-center mt-10">Failed to load products.</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-slate-400 text-center mt-10">No products found.</p>
          ) : (
            <motion.div
              className="grid gap-6 grid-cols-4 p-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={filteredProducts.length} // triggers re-animation when list changes
            >
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.productId || p._id || p.id}
                  className="p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 8px 20px rgba(0,0,0,0.4)" }} // Hover effect
                >
                  <ProductCard product={p} className="w-full h-[400px]" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </motion.div>
  );
}
