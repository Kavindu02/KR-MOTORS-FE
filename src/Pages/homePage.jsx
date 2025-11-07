import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCarSide, FaFacebookF, FaTiktok } from "react-icons/fa";

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-slate-900 text-slate-100"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={slideIn}
    >
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-wide"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to KR MOTORS
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Genuine Auto Parts, Accessories & Trusted Service.
            <br />
            Get the best deals with islandwide delivery.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link
              to="/shop"
              className="inline-block px-10 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-24 bg-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              title: "Genuine Parts",
              text: "High-quality vehicle parts with warranty for your car’s safety.",
            },
            {
              title: "Islandwide Delivery",
              text: "Get your products delivered fast and safely to your doorstep.",
            },
            {
              title: "24/7 Support",
              text: "Friendly customer service to help you with your needs anytime.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-8 bg-slate-700 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

     
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 font-bold text-white text-lg">
              <FaCarSide className="w-6 h-6" /> KR MOTORS
            </div>
            <p className="mt-4 text-sm opacity-80 leading-relaxed">
              We provide genuine vehicle parts and accessories, affordable prices,
              and trusted service with islandwide delivery.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-600 transition duration-300">HOME</Link></li>
              <li><Link to="/shop" className="hover:text-red-600 transition duration-300">SHOP</Link></li>
              <li><Link to="/about" className="hover:text-red-600 transition duration-300">ABOUT</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition duration-300">CONTACT</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Genuine Auto Parts</li>
              <li>Islandwide Delivery</li>
              <li>Warranty & Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-600 transition duration-300">+94 704150080</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-300">krmotorssl@gmail.com</a></li>
            </ul>
            <div className="flex gap-3 mt-4 text-white">
              <a href="https://www.facebook.com/profile.php?id=61557530297240" className="hover:text-red-600 transition duration-300"><FaFacebookF /></a>
              <a href="https://www.tiktok.com/@kr_motors_alawwa" className="hover:text-red-600 transition duration-300"><FaTiktok /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs py-4 border-t border-white/10">
          © {new Date().getFullYear()} KR MOTORS. All Rights Reserved.
        </div>
      </footer>
    </motion.div>
  );
}
