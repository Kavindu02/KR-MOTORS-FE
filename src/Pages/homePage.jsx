import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import { FaCarSide, FaFacebookF, FaTiktok, FaShippingFast, FaShieldAlt, FaHeadset, FaStar, FaArrowRight } from "react-icons/fa";

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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const features = [
    {
      icon: <FaShieldAlt className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: "Genuine Parts",
      text: "100% authentic parts with manufacturer warranty for your peace of mind.",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: <FaShippingFast className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: "Fast Delivery",
      text: "Express shipping across the island with real-time tracking.",
      color: "from-green-500/20 to-green-600/20"
    },
    {
      icon: <FaHeadset className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: "Expert Support",
      text: "Professional guidance from our automotive specialists 24/7.",
      color: "from-purple-500/20 to-purple-600/20"
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "5K+", label: "Products" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-slate-900 text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HERO SECTION - Enhanced */}
      <section className="relative bg-slate-950 min-h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div className="absolute inset-0" style={{ y }}>
          <motion.img
            src="homepagehero.avif"
            alt="Car"
            className="w-full h-full object-cover"
            loading="eager"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-red-900/50"></div>
        </motion.div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px"
            }}
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Floating Particles - Enhanced */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.2})`
              }}
              animate={{
                y: [0, Math.random() * -100 - 50, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 z-10 w-full">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Subtitle Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <FaStar className="text-red-500 text-sm" />
                <span className="text-sm font-semibold text-red-400">Trusted by 10,000+ Customers</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                    "0 0 40px rgba(239, 68, 68, 0.7)",
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Premium Auto Parts
                <br />
                <span className="text-red-500">KR MOTORS</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Discover genuine parts, expert service, and unbeatable prices.
                <br className="hidden sm:block" />
                <span className="text-red-400 font-semibold">Your vehicle deserves the best.</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/shop"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10">Shop Now</span>
                    <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>


          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="relative p-6 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl text-center group hover:border-red-500/50 transition-all"
                whileHover={{ y: -5, scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 rounded-2xl transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-slate-400 uppercase tracking-wider">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-red-500 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION - Enhanced */}
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.div
              className="inline-block px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-semibold text-red-400">Why Choose Us</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Experience the <span className="text-red-500">KR Motors</span> Difference
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We're committed to providing the best automotive parts and service in Sri Lanka
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                className="relative group"
                variants={scaleIn}
                whileHover={{ y: -10 }}
              >
                {/* Card */}
                <div className="relative p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-full">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Icon with glow */}
                  <motion.div
                    className="relative mb-6 inline-flex p-4 bg-slate-800/50 rounded-2xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                    <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl group-hover:bg-red-500/40 transition-all" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed relative z-10">{item.text}</p>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-red-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                  />

                  {/* Shine effect */}
                  <motion.div
                    className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    whileHover={{ left: "150%" }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA SECTION - Enhanced */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Parallax Background */}
        <motion.div className="absolute inset-0" style={{ y }}>
          <img
            src="homepage2.png"
            alt="Workshop"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95"></div>
        </motion.div>

        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/10 to-transparent" />

        <motion.div
          className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-semibold text-red-400">Start Your Journey</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Upgrade<br />Your Vehicle?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore our extensive collection of premium auto parts with warranty and fast delivery
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-2xl"
              >
                <span>Browse Products</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
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
                  <a href={link.path} className="hover:text-red-500 transition duration-300 inline-block hover:translate-x-2">
                    {link.name}
                  </a>
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