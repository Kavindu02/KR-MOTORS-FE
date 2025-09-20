import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../assets/components/loader";
import axios from "axios";
import ImageSlider from "../../assets/components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import { motion } from "framer-motion";

function getPid(p) {
  return p?.productId || p?._id || p?.id;
}
function clampQty(n) {
  const x = Math.floor(Number(n));
  if (Number.isNaN(x) || x < 1) return 1;
  if (x > 999) return 999;
  return x;
}

export default function ProductOverViewPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [adding, setAdding] = useState(false);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
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
      await addToCart(product, qty);
      toast.success("Product added to cart");
      const current = await getCart();
      console.log("Cart now:", current);
    } catch (e) {
      if (e?.response?.status === 401 || e?.response?.status === 403) {
        toast.error("Please login to save your cart");
      } else {
        toast.error("Failed to add to cart");
      }
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

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const buttonTap = { scale: 0.95 };

  return (
    <motion.div
      className="w-full min-h-screen p-6 flex justify-center items-center bg-slate-950 text-slate-200"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      {status === "loading" && <Loader />}

      {status === "success" && product && (
        <div className="w-full max-w-6xl bg-slate-850 shadow-xl rounded-3xl p-6 flex flex-col lg:flex-row gap-8">
          {/* Left: Images */}
          <div className="w-full lg:w-[55%] flex justify-center items-center">
            <ImageSlider images={product.images || []} />
          </div>

          {/* Right: Details */}
          <div className="w-full lg:w-[41%] h-fit flex flex-col items-start justify-start pl-[5px]">
            <h1 className="text-2xl font-bold text-red-500">
              {product.name}{" "}
              {Array.isArray(product.altNames) && product.altNames.length > 0 && (
                <span className="font-light text-slate-300 text-xl">
                  {product.altNames.join(" | ")}
                </span>
              )}
            </h1>

            <p className="text-slate-300 text-base mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-4">
              {product.labellPrice > product.price ? (
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-slate-400 line-through">
                    Rs {product.labellPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold text-red-500">
                    Rs {product.price.toFixed(2)}
                  </span>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 font-semibold rounded-md">
                    {Math.round(
                      ((product.labellPrice - product.price) / product.labellPrice) * 100
                    )}
                    % OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-red-500">
                  Rs {product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity selector */}
            <div className="mt-4 w-full max-w-sm">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  className="w-8 h-8 rounded-lg border border-slate-600 flex items-center justify-center text-lg hover:bg-slate-700"
                  onClick={() => setQty((q) => clampQty(q - 1))}
                  aria-label="Decrease quantity"
                  whileTap={buttonTap}
                >
                  –
                </motion.button>

                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={999}
                  value={qty}
                  onChange={(e) => setQty(clampQty(e.target.value))}
                  className="w-16 h-8 rounded-lg border border-slate-600 text-center bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <motion.button
                  type="button"
                  className="w-8 h-8 rounded-lg border border-slate-600 flex items-center justify-center text-lg hover:bg-slate-700"
                  onClick={() => setQty((q) => clampQty(q + 1))}
                  aria-label="Increase quantity"
                  whileTap={buttonTap}
                >
                  +
                </motion.button>

                <span className="ml-3 text-xs text-slate-300">
                  Subtotal:&nbsp;
                  <b>Rs {(product.price * qty).toFixed(2)}</b>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row gap-3 mt-6">
              <motion.button
                className="px-4 py-2 rounded-xl shadow-lg text-white bg-red-500 border border-red-500 hover:bg-red-600 transition-all duration-300"
                onClick={handleBuyNow}
                whileTap={buttonTap}
              >
                Buy Now
              </motion.button>

              <motion.button
                className={`px-4 py-2 rounded-xl shadow-lg text-white border transition-all duration-300 ${
                  adding
                    ? "bg-slate-600 border-slate-600 cursor-not-allowed"
                    : "text-white bg-red-500 border border-red-500 hover:bg-red-600"
                }`}
                onClick={handleAddToCart}
                disabled={adding}
                whileTap={!adding ? buttonTap : {}}
              >
                {adding ? "Adding..." : "Add to Cart"}
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="text-center text-red-500 font-semibold">
          Error loading product. Please try again later.
        </div>
      )}
    </motion.div>
  );
}
