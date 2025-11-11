import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCarSide, FaFacebookF, FaTiktok, FaClock, FaShippingFast } from "react-icons/fa";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsLoaded(true);
  }, []);

  const contactMethods = [
    {
      icon: <FaPhone className="w-8 h-8" />,
      title: "Call Us",
      detail: "+94 704150080",
      subtext: "Mon-Sat, 9AM-6PM",
      link: "tel:+94704150080"
    },
    {
      icon: <FaEnvelope className="w-8 h-8" />,
      title: "Email Us",
      detail: "krmotorssl@gmail.com",
      subtext: "We'll respond within 24hrs",
      link: "mailto:krmotorssl@gmail.com"
    },
    {
      icon: <FaMapMarkerAlt className="w-8 h-8" />,
      title: "Visit Us",
      detail: "Alawwa, Sri Lanka",
      subtext: "View on Google Maps",
      link: "#map"
    }
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
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&q=70&auto=format"
            alt="Contact"
            className="w-full h-full object-cover"
            loading="eager"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-red-900/50"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-red-500/40 rounded-full"
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

        <div className="relative max-w-6xl mx-auto px-6 py-32 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-wide"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                  "0 0 30px rgba(239, 68, 68, 0.5)",
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Contact <span className="text-red-500">KR MOTORS</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-slate-200 mb-4 leading-relaxed font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Get in touch for genuine vehicle parts, inquiries, or orders
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-red-400 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            We're here to help with islandwide delivery!
          </motion.p>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background pattern */}
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
          className="relative max-w-6xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In <span className="text-red-500">Touch</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, i) => (
              <motion.a
                key={i}
                href={method.link}
                className="relative p-8 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl rounded-3xl overflow-hidden group block"
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
                {/* Hover border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" 
                     style={{ padding: "2px" }}>
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl"></div>
                </div>

                <div className="relative z-10 text-center">
                  <motion.div
                    className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full text-red-500"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {method.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">{method.title}</h3>
                  <p className="text-slate-200 font-medium mb-1">{method.detail}</p>
                  <p className="text-slate-400 text-sm">{method.subtext}</p>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  initial={{ left: "-100%" }}
                  whileHover={{ left: "200%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MAP & INFO SECTION */}
      <section className="py-24 bg-slate-900 relative" id="map">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Info Card */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  Visit Our <span className="text-red-500">Store</span>
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  Drop by our location for expert advice, quality parts inspection, and personalized service. 
                  Our friendly team is ready to help you find exactly what you need.
                </p>
              </motion.div>

              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4 p-6 bg-slate-800 rounded-2xl hover:bg-slate-700/70 transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ x: 10, transition: { duration: 0.3 } }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaClock className="text-red-500 w-6 h-6" />
                  </motion.div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                    <p className="text-slate-300 text-sm">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-slate-400 text-sm">Sunday: Closed</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-6 bg-slate-800 rounded-2xl hover:bg-slate-700/70 transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ x: 10, transition: { duration: 0.3 } }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaShippingFast className="text-red-500 w-6 h-6" />
                  </motion.div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Delivery Service</h4>
                    <p className="text-slate-300 text-sm">Fast islandwide delivery available</p>
                    <p className="text-slate-400 text-sm">Get parts delivered to your doorstep</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.a
                  href="tel:+94704150080"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full text-center shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now
                </motion.a>
                <motion.a
                  href="mailto:krmotorssl@gmail.com"
                  className="flex-1 px-8 py-4 bg-slate-800 text-white font-bold rounded-full text-center shadow-lg hover:bg-slate-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Email Us
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Map */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div 
                className="rounded-3xl overflow-hidden shadow-2xl h-[500px] border-4 border-slate-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63321.578382013024!2d80.19132802198365!3d7.286421976609823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae31900595a9efb%3A0x2e487b89d1fba1e6!2sKR%20MOTORS!5e0!3m2!1sen!2slk!4v1757259628971!5m2!1sen!2slk"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-2xl shadow-2xl"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaMapMarkerAlt className="text-red-500 w-8 h-8" />
                  </motion.div>
                  <div>
                    <div className="font-bold">Find Us</div>
                    <div className="text-sm text-slate-600">Alawwa, Sri Lanka</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=70"
          alt="Auto Parts"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/85"></div>
        
        <motion.div
          className="relative max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Need Quality Auto Parts?
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Browse our collection or contact us for expert recommendations
          </motion.p>
          <motion.button
            className="px-12 py-4 bg-white text-slate-900 font-bold rounded-full shadow-xl hover:bg-red-500 hover:text-white transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 10px 40px rgba(255, 255, 255, 0.3)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Products
          </motion.button>
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

        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-2 font-bold text-white text-xl mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaCarSide className="w-8 h-8 text-red-500" />
              </motion.div>
              KR MOTORS
            </motion.div>
            <p className="text-sm opacity-80 leading-relaxed">
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
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["HOME", "SHOP", "ABOUT", "CONTACT"].map((link, i) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <a href="#" className="hover:text-red-500 transition duration-300 inline-block hover:translate-x-2">
                    {link}
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
            <h4 className="text-white font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
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
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm mb-4">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="tel:+94704150080" className="hover:text-red-500 transition duration-300">+94 704150080</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="mailto:krmotorssl@gmail.com" className="hover:text-red-500 transition duration-300">krmotorssl@gmail.com</a>
              </motion.li>
            </ul>
            <div className="flex gap-3 text-white">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61557530297240"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@kr_motors_alawwa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition duration-300"
                whileHover={{ scale: 1.2, rotate: -360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FaTiktok />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center text-xs py-6 border-t border-white/10 relative z-10"
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