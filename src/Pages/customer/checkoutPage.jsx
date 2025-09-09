// src/pages/checkout/CheckoutPage.jsx
import { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setName(res.data.firstName + " " + res.data.lastName);
        })
        .catch(() => {
          toast.error("Failed to fetch user details.");
          navigate("/login");
        });
    }
  }, [navigate]);

  const [cart, setCart] = useState(location.state?.items || []);

  if (!location.state?.items) {
    toast.error("Please select items to checkout");
    navigate("/shop");
  }

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    if (!name || !address || !phone) {
      toast.error("Please fill all the details");
      return;
    }

    const order = {
      address,
      phone,
      items: cart.map((item) => ({
        productId: item.productId,
        qty: item.quantity,
      })),
    };

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/orders", order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order placed successfully");
    } catch {
      toast.error("Error placing order");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col py-10 items-center bg-slate-950 text-slate-200">
      {cart.map((item, index) => (
        <div
          key={item.productId}
          className="w-[900px] h-[150px] m-[10px] shadow-xl flex flex-row items-center transition-transform hover:-translate-y-1 duration-200 bg-slate-800 rounded-xl"
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
            <button
              className="cursor-pointer text-3xl px-3 hover:text-red-500"
              onClick={() => {
                const newCart = [...cart];
                if (newCart[index].quantity > 1) {
                  newCart[index].quantity -= 1;
                  setCart(newCart);
                }
              }}
            >
              -
            </button>
            <span className="mx-[10px] text-xl">{item.quantity}</span>
            <button
              className="cursor-pointer text-xl px-3 hover:text-red-500"
              onClick={() => {
                const newCart = [...cart];
                newCart[index].quantity += 1;
                setCart(newCart);
              }}
            >
              +
            </button>
          </div>
          <div className="w-[190px] h-full flex justify-end items-center pr-[20px]">
            <span className="font-bold text-red-500">
              Rs {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
          <button
            className="w-[30px] h-[30px] bg-red-500 text-white font-bold hover:bg-red-600 cursor-pointer rounded-full mr-[20px] flex items-center justify-center"
            onClick={() => {
              const newCart = [...cart];
              newCart.splice(index, 1);
              setCart(newCart);
            }}
          >
            <RiDeleteBin5Fill />
          </button>
        </div>
      ))}

      <div className="w-[900px] h-[100px] m-[10px] shadow-xl flex flex-row items-center justify-center relative bg-slate-800 rounded-xl">
        <input
          className="w-[200px] h-[40px] bg-slate-700 text-slate-200 border border-slate-600 rounded-lg p-[10px] mr-[10px]"
          type="text"
          placeholder="Enter Your Name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-[400px] h-[40px] bg-slate-700 text-slate-200 border border-slate-600 rounded-lg p-[10px] mr-[10px]"
          type="text"
          placeholder="Enter Your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="w-[200px] h-[40px] bg-slate-700 text-slate-200 border border-slate-600 rounded-lg p-[10px] mr-[10px]"
          type="text"
          placeholder="Enter Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="w-[900px] h-[100px] m-[10px] shadow-xl flex flex-row items-center justify-end relative bg-slate-800 rounded-xl">
        <span className="font-bold text-xl text-red-500 mr-[20px]">
          Total: Rs {getTotal().toFixed(2)}
        </span>
        <button
          className="absolute left-10 bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 cursor-pointer transition"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
