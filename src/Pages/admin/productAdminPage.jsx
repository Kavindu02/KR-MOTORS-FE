import { useEffect, useState } from "react";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../assets/components/loader";

export default function ProductAdminPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((res) => {
          setProducts(res.data);
          setisLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load products");
          setisLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto shadow-2xl rounded-2xl bg-slate-800/90 border border-slate-700">
          <table className="w-full text-left border-collapse text-slate-200">
            {/* Table Head */}
            <thead>
              <tr className="bg-slate-900 text-red-500 text-sm uppercase">
                <th className="p-4">Image</th>
                <th className="p-4">Product ID</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Label Price</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700 hover:bg-slate-700/40 transition-colors"
                >
                  {/* Image */}
                  <td className="p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover shadow"
                    />
                  </td>

                  {/* Product ID */}
                  <td className="p-4 text-slate-400">{product.productId}</td>

                  {/* Product Name */}
                  <td className="p-4 font-medium text-slate-200">
                    {product.name}
                  </td>

                  {/* Label Price */}
                  <td className="p-4 text-slate-400">
                    Rs {product.labellPrice}
                  </td>

                  {/* Price */}
                  <td className="p-4 text-red-500 font-semibold">
                    Rs {product.price}
                  </td>

                  {/* Stock */}
                  <td
                    className={`p-4 font-medium ${
                      product.stock > 0
                        ? "text-green-400"
                        : "text-red-500 font-semibold"
                    }`}
                  >
                    {product.stock}
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex items-center justify-center gap-3">
                    {/* Delete */}
                    <BiTrash
                      className="bg-red-600 p-2 text-3xl rounded-full text-white shadow cursor-pointer hover:bg-red-700 transition"
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (token == null) {
                          navigate("/login");
                          return;
                        }

                        axios
                          .delete(
                            import.meta.env.VITE_BACKEND_URL +
                              "/products/" +
                              product.productId,
                            {
                              headers: {
                                Authorization: `Bearer ${token}` },
                            }
                          )
                          .then(() => {
                            toast.success("Product Deleted Successfully");
                            setisLoading(true);
                          })
                          .catch((error) => {
                            console.error("Error deleting product:", error);
                            toast.error("Failed to delete product");
                          });
                      }}
                    />

                    {/* Edit */}
                    <BiEditAlt
                      onClick={() => {
                        navigate("/admin/updateproduct", {
                          state: product,
                        });
                      }}
                      className="bg-slate-600 p-2 text-3xl rounded-full text-white shadow cursor-pointer hover:bg-slate-700 transition"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Add Button */}
      <Link
        to={"/admin/newproduct"}
        className="fixed right-10 bottom-10 text-white bg-red-600 p-4 rounded-full shadow-xl hover:bg-red-700 transition"
      >
        <HiMiniPlusCircle className="text-5xl" />
      </Link>
    </div>
  );
}
