import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCarSide, FaUser, FaEnvelope, FaPhone, FaSignOutAlt } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const scaleIn = {
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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

// Full page loading component
function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-white mb-2"
          animate={{ 
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Profile
        </motion.h2>
        <motion.div className="flex gap-2 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        
        if (data.role === "admin") {
          window.location.href = "/admin";
          return;
        }

        setUser(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Show loading screen
  if (loading) {
    return <PageLoader />;
  }

  // Show error screen
  if (error) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80&auto=format"
            alt="Sports car"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-red-900/50"></div>
        </div>
        <motion.div
          className="relative z-10 text-red-400 text-lg bg-slate-900/80 backdrop-blur-xl px-8 py-4 rounded-2xl border border-red-500/30"
          initial="hidden"
          animate="show"
          variants={scaleIn}
        >
          {error}
        </motion.div>
      </div>
    );
  }

  // Show profile content
  return (
    <motion.div 
      className="relative flex items-center justify-center min-h-screen bg-slate-950 overflow-hidden py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.img
          alt="Sports car"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-red-900/50"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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

      {/* Profile Card */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto"
        variants={scaleIn}
        initial="hidden"
        animate="show"
      >
        {/* Glass morphism card */}
        <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Glow effects */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* Header with Logo */}
            <motion.div 
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FaCarSide className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                </motion.div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">KR MOTORS</h1>
              </div>
              
              <motion.button
                onClick={handleLogout}
                className="w-10 h-10 bg-red-600/20 hover:bg-red-600/30 rounded-xl flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 border border-red-500/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Logout"
              >
                <FaSignOutAlt className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Profile Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Image & Name */}
              <motion.div
                className="lg:col-span-1 flex flex-col items-center"
                variants={fadeInUp}
                initial="hidden"
                animate="show"
              >
                <div className="relative">
                  {user?.image ? (
                    <motion.img
                      src={user.image}
                      alt="Profile"
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-red-500 shadow-xl object-cover"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  ) : (
                    <motion.div
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-4xl sm:text-5xl font-bold text-red-500 border-4 border-red-500 shadow-xl"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {user?.firstName?.charAt(0) || "U"}
                      {user?.lastName?.charAt(0) || ""}
                    </motion.div>
                  )}
                </div>

                <motion.h2 
                  className="mt-6 text-2xl sm:text-3xl font-extrabold text-white tracking-wide text-center"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.3)",
                      "0 0 30px rgba(239, 68, 68, 0.5)",
                      "0 0 20px rgba(239, 68, 68, 0.3)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {user?.firstName || "User"} {user?.lastName || ""}
                </motion.h2>

                <motion.p 
                  className="text-slate-400 text-sm mt-2 text-center px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Member Profile
                </motion.p>
              </motion.div>

              {/* Right Column - Profile Details */}
              <motion.div
                className="lg:col-span-2"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                <motion.h3 
                  className="text-xl font-bold text-white mb-6"
                  variants={itemVariant}
                >
                  Profile Information
                </motion.h3>

                <div className="space-y-4">
                  {[
                    { 
                      icon: FaUser, 
                      label: "First Name", 
                      value: user?.firstName || "Not Provided",
                      color: "text-blue-400"
                    },
                    { 
                      icon: FaUser, 
                      label: "Last Name", 
                      value: user?.lastName || "Not Provided",
                      color: "text-purple-400"
                    },
                    { 
                      icon: FaEnvelope, 
                      label: "Email", 
                      value: user?.email || "Not Provided",
                      color: "text-green-400"
                    },
                    { 
                      icon: FaPhone, 
                      label: "Phone", 
                      value: user?.phone || "Not Provided",
                      color: "text-orange-400"
                    },
                  ].map(({ icon: Icon, label, value, color }, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      variants={itemVariant}
                    >
                      <motion.div
                        className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-lg hover:shadow-red-500/20 transition-all duration-300"
                        whileHover={{ scale: 1.02, borderColor: "rgba(239, 68, 68, 0.3)" }}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ${color} border border-white/10 group-hover:border-red-500/30 transition-all duration-300 flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-slate-400 font-medium mb-1">{label}</div>
                          <div className="text-white font-semibold text-sm sm:text-base truncate">{value}</div>
                        </div>
                      </motion.div>
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: index * 0.2 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            animate={{ left: ["150%", "-150%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
        </div>
      </motion.div>

      {/* Bottom Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            fill="rgba(239, 68, 68, 0.1)"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,234.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,234.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,133.3C672,128,768,160,864,181.3C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,234.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}