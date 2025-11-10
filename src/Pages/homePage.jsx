import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCarSide, FaFacebookF, FaTiktok, FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function HomePage() {
  const features = [
    {
      icon: <FaShieldAlt className="w-12 h-12 text-red-500" />,
      title: "Genuine Parts",
      text: "High-quality vehicle parts with warranty for your car's safety.",
    },
    {
      icon: <FaShippingFast className="w-12 h-12 text-red-500" />,
      title: "Islandwide Delivery",
      text: "Get your products delivered fast and safely to your doorstep.",
    },
    {
      icon: <FaHeadset className="w-12 h-12 text-red-500" />,
      title: "24/7 Support",
      text: "Friendly customer service to help you with your needs anytime.",
    },
  ];

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-slate-900 text-slate-100"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={slideIn}
    >
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 flex-grow overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
            alt="Car"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-red-900/40"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
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
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-wide"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 40px rgba(239, 68, 68, 0.3)",
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Welcome to <span className="text-red-500">KR MOTORS</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed font-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Genuine Auto Parts, Accessories & Trusted Service.
            <br />
            <span className="text-red-400 font-semibold">Get the best deals with islandwide delivery.</span>
          </motion.p>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/shop"
              className="inline-block px-12 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Shop Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=100&q=50')",
            backgroundSize: "100px 100px"
          }}></div>
        </div>

        <motion.div
          className="relative max-w-6xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            variants={fadeInUp}
          >
            Why Choose <span className="text-red-500">KR Motors?</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                className="relative p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-3xl overflow-hidden group"
                variants={scaleIn}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" 
                     style={{ padding: "2px" }}>
                  <div className="w-full h-full bg-slate-800 rounded-3xl"></div>
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="mb-6 inline-block"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.text}</p>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  whileHover={{ left: "150%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80"
          alt="Workshop"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/80"></div>
        
        <motion.div
          className="relative max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Upgrade Your Vehicle?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Browse our extensive collection of genuine auto parts and accessories
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/shop"
              className="inline-block px-12 py-4 bg-white text-slate-900 font-bold rounded-full shadow-2xl hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Explore Products
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 relative">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 font-bold text-white text-xl mb-4">
              <FaCarSide className="w-8 h-8 text-red-500" /> KR MOTORS
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              We provide genuine vehicle parts and accessories, affordable prices,
              and trusted service with islandwide delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition duration-300 inline-block hover:translate-x-1">HOME</Link></li>
              <li><Link to="/shop" className="hover:text-red-500 transition duration-300 inline-block hover:translate-x-1">SHOP</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition duration-300 inline-block hover:translate-x-1">ABOUT</Link></li>
              <li><Link to="/contact" className="hover:text-red-500 transition duration-300 inline-block hover:translate-x-1">CONTACT</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-red-500">•</span> Genuine Auto Parts</li>
              <li className="flex items-center gap-2"><span className="text-red-500">•</span> Islandwide Delivery</li>
              <li className="flex items-center gap-2"><span className="text-red-500">•</span> Warranty & Returns</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li><a href="tel:+94704150080" className="hover:text-red-500 transition duration-300">+94 704150080</a></li>
              <li><a href="mailto:krmotorssl@gmail.com" className="hover:text-red-500 transition duration-300">krmotorssl@gmail.com</a></li>
            </ul>
            <div className="flex gap-3 text-white">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61557530297240"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@kr_motors_alawwa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition duration-300"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTiktok />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="text-center text-xs py-6 border-t border-white/10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} KR MOTORS. All Rights Reserved.
          </motion.p>
        </div>
      </footer>
    </motion.div>
  );
}