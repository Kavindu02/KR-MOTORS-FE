import { FaCarSide, FaFacebookF, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const slideIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutUs() {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-slate-950 text-slate-200"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={slideIn}
    >
      {/* About Section */}
      <section className="text-center py-20 flex-grow px-6 bg-slate-900/80">
        <h1 className="text-4xl font-bold text-red-500 mb-4">ABOUT US</h1>
        <h2 className="text-lg text-slate-300 font-semibold leading-relaxed">
          Genuine Vehicle Parts • Affordable Prices <br />
          Islandwide Delivery with Warranty & Customer Support <br />
          KR MOTORS – Your Trusted Auto Parts Shop!
        </h2>
        <div className="mt-8 max-w-4xl mx-auto text-slate-300 text-justify leading-relaxed space-y-8">
          <p>
            <strong>KR MOTORS</strong> is your reliable partner for High-quality vehicle parts and accessories. 
            With years of experience, we supply genuine spare parts for cars, bikes, and trucks at the best prices. 
            Our goal is to keep your vehicle performing at its best while saving you money and time.
          </p>
          <p>
            Every product we sell is carefully checked for quality and durability, ensuring that our customers 
            receive only the best. As authorized dealers for top vehicle part brands, we are able to provide 
            original parts with warranty and trusted after-sales service.
          </p>
          <p>
            Whether you are looking for engine components, brake systems, body parts, or accessories, KR MOTORS 
            offers a wide range of products to meet your needs. We also provide islandwide delivery so that you 
            can get your required parts delivered to your doorstep quickly and safely.
          </p>
          <p className="text-center italic text-slate-400">
            Choose KR MOTORS – where quality meets trust. Let us keep your vehicle running smoothly!
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900/90 text-slate-300 border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <FaCarSide className="w-5 h-5" /> KR MOTORS
            </div>
            <p className="mt-4 text-sm opacity-80">
              We provide genuine vehicle parts and accessories, affordable prices, 
              and trusted service with islandwide delivery.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-600 transition duration-300">HOME</Link></li>
              <li><Link to="/shop" className="hover:text-red-600 transition duration-300">SHOP</Link></li>
              <li><Link to="/about" className="hover:text-red-600 transition duration-300">ABOUT</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition duration-300">CONTACT</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Genuine Auto Parts</li>
              <li>Islandwide Delivery</li>
              <li>Warranty & Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-600 transition duration-300">+94 704150080</a></li>
              <li><a href="#" className="hover:text-red-600 transition duration-300">krmotorssl@gmail.com</a></li>
            </ul>
            <div className="flex gap-3 mt-4 text-white">
              <a href="https://www.facebook.com/profile.php?id=61557530297240" className="hover:text-red-600 transition duration-300"><FaFacebookF /></a>
              <a href="https://www.tiktok.com/@kr_motors_alawwa" className="hover:text-red-600 transition duration-300"><FaTiktok/></a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs py-4 border-t border-white/10 text-slate-400">
          © {new Date().getFullYear()} KR MOTORS. All Rights Reserved.
        </div>
      </footer>
    </motion.div>
  );
}
