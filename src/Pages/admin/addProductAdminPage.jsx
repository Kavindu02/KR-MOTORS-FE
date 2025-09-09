import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import uploadFile from "../../utils/mediaUpload";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setProductName] = useState("");
  const [altNames, setAlternativeName] = useState("");
  const [labellPrice, setLablePrice] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const navigate = useNavigate();

  async function handleSubmit() {
    if (!productId || !name || !price) {
      toast.error("Product ID, Name and Price are required");
      return;
    }

    const promisesArray = images.map((img) => uploadFile(img));
    const responses = await Promise.all(promisesArray);

    const altNamesInArray = altNames ? altNames.split(",") : [];

    const productData = {
      productId,
      name,
      altNames: altNamesInArray,
      labellPrice,
      price,
      images: responses,
      description,
      stock,
      isAvailable,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/products",
        productData,
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("Product Added Successfully");
      toast.success("Product Added Successfully");
      navigate("/admin/product");
    } catch (error) {
      console.error("Error Adding Product:", error);
      toast.error("Failed to Add Product");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-auto p-6">
      <div className="w-full max-w-[800px] rounded-2xl shadow-2xl p-8 bg-slate-800/90 flex flex-col gap-6 text-white">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-4">
          Add New Product
        </h2>

        {/* Product ID + Name */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-semibold">Product ID</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full border border-white/20 h-[45px] rounded-lg px-3 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-semibold">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-white/20 h-[45px] rounded-lg px-3 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Alternative Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Alternative Name</label>
          <input
            type="text"
            value={altNames}
            onChange={(e) => setAlternativeName(e.target.value)}
            className="w-full border border-white/20 h-[45px] rounded-lg px-3 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Label Price + Price */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-semibold">Label Price</label>
            <input
              type="number"
              value={labellPrice}
              onChange={(e) => setLablePrice(e.target.value)}
              className="w-full border border-white/20 h-[45px] rounded-lg px-3 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-semibold">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-white/20 h-[45px] rounded-lg px-3 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Images */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Images</label>
          <input
            multiple
            type="file"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImages((prevImages) => [...prevImages, ...files]);
            }}
            className="w-full border border-white/20 h-[45px] rounded-lg px-3 py-1 bg-slate-900 text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-white/20 h-[120px] rounded-lg px-3 py-2 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Stock + Availability */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-semibold">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-white/20 h-[45px] rounded-lg px-3 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-semibold">Is Available</label>
            <select
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value === "true")}
              className="w-full border border-white/20 h-[45px] rounded-lg px-3 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>
        </div>

      {/* Buttons */}
        <div className="flex justify-center gap-4 py-4">
          <Link
            to="/admin/product"
            className="w-[200px] h-[50px] border-2 border-red-600 rounded-xl flex justify-center items-center hover:bg-red-500 hhover:bg-red-600 hover:text-white transition duration-300"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="cursor-pointer w-[200px] h-[50px] bg-red-600 rounded-xl flex justify-center items-center text-white text-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
