import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaCarSide, FaFacebookF, FaTiktok, FaAward, FaUsers, FaTools, FaShieldAlt } from "react-icons/fa";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const values = [
    {
      icon: <FaAward className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: "Quality Assurance",
      text: "Every product is carefully checked for quality and durability.",
    },
    {
      icon: <FaUsers className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: "Customer First",
      text: "Your satisfaction is our priority with trusted after-sales service.",
    },
    {
      icon: <FaTools className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: "Expert Knowledge",
      text: "Years of experience in vehicle parts and accessories.",
    },
    {
      icon: <FaShieldAlt className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
      title: "Warranty Protection",
      text: "Original parts with warranty for your peace of mind.",
    },
  ];

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-slate-900 text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="aboutpagehero.jpg"
            alt="Auto Parts"
            className="w-full h-full object-cover"
            loading="eager"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-red-900/50"></div>
          
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-red-500/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-28 lg:py-32 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-white tracking-wide px-2"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                  "0 0 30px rgba(239, 68, 68, 0.5)",
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              About <span className="text-red-500">KR MOTORS</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-200 mb-3 sm:mb-4 leading-relaxed font-light max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Genuine Vehicle Parts • Affordable Prices
          </motion.p>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-red-400 font-semibold px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Islandwide Delivery with Warranty & Customer Support
          </motion.p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute inset-0" 
            style={{
              backgroundImage: "radial-gradient(circle, #ef4444 1px, transparent 1px)",
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

        <motion.div
          className="relative max-w-6xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Your Trusted <span className="text-red-500">Auto Parts</span> Partner
              </motion.h2>
              
              <div className="space-y-4 sm:space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <strong className="text-white">KR MOTORS</strong> is your reliable partner for high-quality vehicle parts and accessories. 
                  With years of experience, we supply genuine spare parts for cars, bikes, and trucks at the best prices. 
                  Our goal is to keep your vehicle performing at its best while saving you money and time.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Every product we sell is carefully checked for quality and durability, ensuring that our customers 
                  receive only the best. As authorized dealers for top vehicle part brands, we are able to provide 
                  original parts with warranty and trusted after-sales service.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Whether you are looking for engine components, brake systems, body parts, or accessories, KR MOTORS 
                  offers a wide range of products to meet your needs. We also provide islandwide delivery so that you 
                  can get your required parts delivered to your doorstep quickly and safely.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="relative order-first md:order-last"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div 
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80"
                  alt="Auto Parts"
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-red-500 text-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <motion.div 
                  className="text-3xl sm:text-4xl font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  10+
                </motion.div>
                <div className="text-xs sm:text-sm">Years Experience</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
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

        <motion.div
          className="relative max-w-6xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-white px-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose <span className="text-red-500">Us?</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((item, i) => (
              <motion.div
                key={i}
                className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)",
                  transition: { duration: 0.3 }
                }}
                transition={{ delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" 
                     style={{ padding: "2px" }}>
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl"></div>
                </div>

                <div className="relative z-10 text-center">
                  <motion.div
                    className="mb-4 sm:mb-6 inline-block"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-red-400 transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">{item.text}</p>
                </div>

                <motion.div
                  className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  initial={{ left: "-100%" }}
                  whileHover={{ left: "200%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=70"
          alt="Workshop"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/85"></div>
        
        <motion.div
          className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 italic px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Choose KR MOTORS – where quality meets trust. Let us keep your vehicle running smoothly!
          </motion.p>
          
          <motion.div 
            className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a href="/shop">
              <motion.div
                className="inline-block px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-xl relative overflow-hidden group cursor-pointer text-sm sm:text-base"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(239, 68, 68, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Browse Products</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </a>
            
            <a href="/contact">
              <motion.div
                className="inline-block px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 bg-white text-slate-900 font-bold rounded-full shadow-xl hover:bg-slate-100 transition-all duration-300 cursor-pointer text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.div>
            </a>
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative z-10">
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
                <FaFacebookF className="text-sm" />
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
                <FaTiktok className="text-sm" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center text-xs py-4 sm:py-5 md:py-6 border-t border-white/10 relative z-10 px-4"
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