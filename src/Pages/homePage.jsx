import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const features = [
    {
      icon: <FaShieldAlt className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-500" />,
      title: "Genuine Parts",
      text: "High-quality vehicle parts with warranty for your car's safety.",
    },
    {
      icon: <FaShippingFast className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-500" />,
      title: "Islandwide Delivery",
      text: "Get your products delivered fast and safely to your doorstep.",
    },
    {
      icon: <FaHeadset className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-500" />,
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
            src="homepagehero.avif"
            alt="Car"
            className="w-full h-full object-cover"
            loading="eager"
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
                className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-red-500/30 rounded-full"
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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-32 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-white tracking-wide px-2"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 mb-8 sm:mb-10 leading-relaxed font-light px-4"
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
              className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm sm:text-base font-bold rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 relative overflow-hidden group"
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
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full mt-1.5 sm:mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=100&q=50')",
            backgroundSize: "100px 100px"
          }}></div>
        </div>

        <motion.div
          className="relative max-w-6xl mx-auto px-4 sm:px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-white px-2"
            variants={fadeInUp}
          >
            Why Choose <span className="text-red-500">KR Motors?</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden group"
                variants={scaleIn}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" 
                     style={{ padding: "2px" }}>
                  <div className="w-full h-full bg-slate-800 rounded-2xl sm:rounded-3xl"></div>
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="mb-4 sm:mb-6 inline-block"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{item.text}</p>
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
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <motion.img
          src="homepage2.png"
          alt="Workshop"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/80"></div>
        
        <motion.div
          className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Ready to Upgrade Your Vehicle?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 px-4">
            Browse our extensive collection of genuine auto parts and accessories
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/shop"
              className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-white text-slate-900 text-sm sm:text-base font-bold rounded-full shadow-2xl hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Explore Products
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(45deg, #ef4444 25%, transparent 25%, transparent 75%, #ef4444 75%, #ef4444), linear-gradient(45deg, #ef4444 25%, transparent 25%, transparent 75%, #ef4444 75%, #ef4444)",
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 30px 30px"
            }}
            animate={{
              backgroundPosition: ["0px 0px, 30px 30px", "60px 60px, 90px 90px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-2 font-bold text-white text-lg sm:text-xl mb-3 sm:mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaCarSide className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              </motion.div>
              KR MOTORS
            </motion.div>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
              We provide genuine vehicle parts and accessories, affordable prices,
              and trusted service with islandwide delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {[
                { name: "HOME", path: "/" },
                { name: "SHOP", path: "/shop" },
                { name: "ABOUT", path: "/about" },
                { name: "CONTACT", path: "/contact" }
              ].map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link to={link.path} className="hover:text-red-500 transition duration-300 inline-block hover:translate-x-2">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {[
                "Genuine Auto Parts",
                "Islandwide Delivery",
                "Warranty & Returns"
              ].map((service, i) => (
                <motion.li 
                  key={service}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <motion.span 
                    className="text-red-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    •
                  </motion.span>
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm mb-3 sm:mb-4">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="tel:+94704150080" className="hover:text-red-500 transition duration-300 break-words">+94 704150080</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="mailto:krmotorssl@gmail.com" className="hover:text-red-500 transition duration-300 break-words">krmotorssl@gmail.com</a>
              </motion.li>
            </ul>
            <div className="flex gap-2 sm:gap-3 text-white">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61557530297240"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FaFacebookF className="text-sm sm:text-base" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@kr_motors_alawwa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition duration-300"
                whileHover={{ scale: 1.2, rotate: -360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FaTiktok className="text-sm sm:text-base" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center text-xs py-5 sm:py-6 border-t border-white/10 relative z-10 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} KR MOTORS. All Rights Reserved.</p>
        </motion.div>
      </footer>
    </motion.div>
  );
}