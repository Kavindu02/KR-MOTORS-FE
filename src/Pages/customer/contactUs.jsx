import { FaPhone, FaEnvelope, FaCarSide, FaFacebookF, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-slate-950 text-slate-200"
    >
      
      {/* CONTACT HEADER */}
      <section className="py-16 bg-slate-900/80 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-red-500 mb-4">CONTACT US</h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Secure your world with trusted vehicle parts and accessories. Contact us for inquiries or orders!
          </p>
        </div>
      </section>

      {/* CONTACT INFO + MAP */}
      <section className="flex-grow py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Info Card */}
          <div className="bg-slate-800 rounded-3xl shadow-xl p-8 flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-red-500">Get in Touch</h2>
            <p className="text-slate-300 text-sm">
              Contact us for genuine vehicle parts, islandwide delivery, or warranty inquiries.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhone className="text-red-500 w-5 h-5" />
                <span className="font-medium">+94 704150080</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-500 w-5 h-5" />
                <span className="font-medium">krmotorssl@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-xl h-72 md:h-[400px] w-full border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63321.578382013024!2d80.19132802198365!3d7.286421976609823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae31900595a9efb%3A0x2e487b89d1fba1e6!2sKR%20MOTORS!5e0!3m2!1sen!2slk!4v1757259628971!5m2!1sen!2slk"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER (same theme as Home/Admin/About Us) */}
      <footer className="bg-slate-900/90 text-slate-300 border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <FaCarSide className="w-5 h-5" /> KR MOTORS
            </div>
            <p className="mt-4 text-sm opacity-80">
              We provide genuine vehicle parts and accessories, affordable prices, 
              and trusted service with islandwide delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-600 transition duration-300">HOME</Link></li>
              <li><Link to="/shop" className="hover:text-red-600 transition duration-300">SHOP</Link></li>
              <li><Link to="/about" className="hover:text-red-600 transition duration-300">ABOUT</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition duration-300">CONTACT</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Genuine Auto Parts</li>
              <li>Islandwide Delivery</li>
              <li>Warranty & Returns</li>
            </ul>
          </div>

          {/* Contact Info */}
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
