import { Link } from "react-router-dom";
import { FaCarSide, FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-wide">
            Welcome to KR MOTORS
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            Genuine Auto Parts, Accessories & Trusted Service.  
            Get the best deals with islandwide delivery.
          </p>
          <Link
            to="/shop"
            className="inline-block px-10 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-24 bg-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 bg-slate-700 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Genuine Parts</h3>
            <p className="text-slate-300 leading-relaxed">
              High-quality vehicle parts with warranty for your car’s safety.
            </p>
          </div>

          <div className="p-8 bg-slate-700 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Islandwide Delivery</h3>
            <p className="text-slate-300 leading-relaxed">
              Get your products delivered fast and safely to your doorstep.
            </p>
          </div>

          <div className="p-8 bg-slate-700 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">24/7 Support</h3>
            <p className="text-slate-300 leading-relaxed">
              Friendly customer service to help you with your needs anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 font-bold text-white text-lg">
              <FaCarSide className="w-6 h-6" /> KR MOTORS
            </div>
            <p className="mt-4 text-sm opacity-80 leading-relaxed">
              We provide genuine vehicle parts and accessories, affordable prices,
              and trusted service with islandwide delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-600 transition duration-300">HOME</Link></li>
              <li><Link to="/shop" className="hover:text-red-600 transition duration-300">SHOP</Link></li>
              <li><Link to="/about" className="hover:text-red-600 transition duration-300">ABOUT</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition duration-300">CONTACT</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-lg">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Genuine Auto Parts</li>
              <li>Islandwide Delivery</li>
              <li>Warranty & Returns</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg">Contact Us</h4>
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
        
        <div className="text-center text-xs py-4 border-t border-white/10">
          © {new Date().getFullYear()} KR MOTORS. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
