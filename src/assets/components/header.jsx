import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect, Fragment } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartBounce, setCartBounce] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const [userName, setUserName] = useState("");

  const token = localStorage.getItem("token");

  // Get user data and extract first letter of first name
  useEffect(() => {
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const firstName = userData.firstName || userData.name || userData.username || "";
        
        if (firstName) {
          setUserInitial(firstName.charAt(0).toUpperCase());
          setUserName(firstName);
        } else {
          // Fallback: try to get from token payload if it's a JWT
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const name = payload.firstName || payload.name || payload.username || "";
            setUserInitial(name.charAt(0).toUpperCase());
            setUserName(name);
          } catch {
            setUserInitial("U");
            setUserName("User");
          }
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserInitial("U");
        setUserName("User");
      }
    } else {
      setUserInitial("");
      setUserName("");
    }
  }, [token]);

  // Real-time cart count monitoring
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const totalItems = Array.isArray(cart) 
          ? cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0)
          : 0;
        
        setCartCount(prevCount => {
          if (totalItems > prevCount && prevCount > 0) {
            setCartBounce(true);
            setTimeout(() => setCartBounce(false), 600);
          }
          return totalItems;
        });
      } catch (error) {
        console.error("Cart parsing error:", error);
        setCartCount(0);
      }
    };

    updateCartCount();

    const handleStorageChange = (e) => {
      if (e.key === "cart" || e.key === null) {
        updateCartCount();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    const interval = setInterval(updateCartCount, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  // Scroll effect only on home
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileOpen && !e.target.closest(".profile-dropdown")) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserInitial("");
    setUserName("");
    navigate("/login");
  }

  const headerBgClass = isHome
    ? scrolled
      ? "bg-black/90 shadow-md backdrop-blur-md"
      : "bg-transparent"
    : "bg-black/95 shadow-md backdrop-blur-sm";

  return (
    <Fragment>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.3);
          }
          50% {
            transform: scale(0.9);
          }
          75% {
            transform: scale(1.15);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes initialReveal {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-180deg);
          }
          60% {
            transform: scale(1.1) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .cart-bounce {
          animation: bounce 0.6s ease-in-out;
        }

        .cart-badge-pulse {
          animation: pulse 2s infinite;
        }

        .dropdown-enter {
          animation: slideDown 0.3s ease-out;
        }

        .mobile-menu-enter {
          animation: slideDown 0.3s ease-out;
        }

        .initial-reveal {
          animation: initialReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .user-initial-avatar {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .user-initial-avatar::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }

        .user-initial-avatar:hover {
          transform: scale(1.05) rotate(5deg);
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);
        }

        .nav-link {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ef4444, #dc2626);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .icon-hover {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-hover::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .icon-hover:hover::before {
          opacity: 1;
        }

        .icon-hover:hover {
          transform: translateY(-3px) scale(1.05);
          background: rgba(255, 255, 255, 0.2);
        }

        .icon-hover:active {
          transform: translateY(-1px) scale(0.98);
        }

        .cart-badge {
          animation: fadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .logo-hover {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 0 0 transparent);
        }

        .logo-hover:hover {
          transform: scale(1.08) rotate(-2deg);
          filter: drop-shadow(0 4px 12px rgba(239, 68, 68, 0.3));
        }

        .mobile-menu-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .mobile-menu-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 0;
          background: linear-gradient(180deg, #ef4444, #dc2626);
          transition: height 0.3s ease;
        }

        .mobile-menu-item:hover::before {
          height: 70%;
        }

        .mobile-menu-item:hover {
          transform: translateX(8px);
        }

        .glass-effect {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
        }

        .glow-red {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2);
        }

        @media (max-width: 768px) {
          .nav-link::after {
            bottom: -2px;
          }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${headerBgClass} text-white border-b border-white/5`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[80px] sm:h-[90px] px-4 sm:px-6 lg:px-8 relative">
          {/* Logo Left */}
          <div
            className="flex items-center gap-2 font-bold tracking-wide text-base sm:text-lg cursor-pointer logo-hover z-10"
            onClick={() => navigate("/")}
          >
            <img
              src="/krmotorslogo.png"
              alt="KR Motors"
              className="w-[45px] sm:w-[55px] md:w-[60px] h-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-sm uppercase font-semibold tracking-wider">
            <Link to="/" className="nav-link hover:text-red-500 px-3 py-2">
              Home
            </Link>
            <Link to="/shop" className="nav-link hover:text-red-500 px-3 py-2">
              Shop
            </Link>
            <Link to="/about" className="nav-link hover:text-red-500 px-3 py-2">
              About
            </Link>
            <Link to="/contact" className="nav-link hover:text-red-500 px-3 py-2">
              Contact
            </Link>
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 relative">
            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className={`relative flex items-center justify-center w-11 h-11 rounded-full icon-hover ${
                cartBounce ? "cart-bounce" : ""
              }`}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <FaCartShopping className="w-5 h-5 xl:w-6 xl:h-6 relative z-10" />
              {cartCount > 0 && (
                <span className="cart-badge cart-badge-pulse absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-700 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center shadow-lg border-2 border-black/50">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Profile Icon/Initial */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                  token && userInitial 
                    ? "user-initial-avatar initial-reveal text-white border-2 border-white/20 shadow-lg" 
                    : "icon-hover"
                }`}
                aria-label="User profile menu"
                title={token && userName ? `Hello, ${userName}!` : "Profile"}
              >
                {token && userInitial ? (
                  <span className="relative z-10 text-base xl:text-lg font-bold">
                    {userInitial}
                  </span>
                ) : (
                  <FaUser className="w-5 h-5 xl:w-6 xl:h-6 relative z-10" />
                )}
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="dropdown-enter absolute right-0 mt-3 w-56 glass-effect shadow-2xl rounded-xl overflow-hidden z-50 border border-white/10">
                  {token && userName && (
                    <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-r from-red-500/10 to-red-600/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full user-initial-avatar flex items-center justify-center text-lg font-bold">
                          {userInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {userName}
                          </p>
                          <p className="text-xs text-gray-400">Welcome back!</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col text-sm font-medium">
                    {token ? (
                      <>
                        <Link
                          to="/profile"
                          className="px-5 py-3 hover:bg-white/10 hover:text-red-400 transition-all duration-200 flex items-center gap-3"
                          onClick={() => setProfileOpen(false)}
                        >
                          <FaUser className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <div className="border-t border-white/10" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setProfileOpen(false);
                          }}
                          className="text-left px-5 py-3 hover:bg-red-600/90 hover:text-white transition-all duration-200 text-red-400 flex items-center gap-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        className="px-5 py-3 hover:bg-white/10 hover:text-red-400 transition-all duration-200 flex items-center gap-3"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FaUser className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Icons & Menu */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            {/* Mobile Cart Icon */}
            <Link
              to="/cart"
              className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full icon-hover ${
                cartBounce ? "cart-bounce" : ""
              }`}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <FaCartShopping className="w-5 h-5 relative z-10" />
              {cartCount > 0 && (
                <span className="cart-badge cart-badge-pulse absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-700 text-white text-xs font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center shadow-lg border-2 border-black/50">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

           

            {/* Mobile Menu Button */}
            <button
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full icon-hover"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <HiX className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
              ) : (
                <HiMenu className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu-enter lg:hidden fixed top-[80px] sm:top-[90px] left-0 w-full glass-effect text-white shadow-2xl z-[70] border-t border-white/10">
          <div className="flex flex-col px-4 sm:px-6 py-5 space-y-1 max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-90px)] overflow-y-auto">
            {/* User Greeting (Mobile) */}
            {token && userName && (
              <div className="mb-3 p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full user-initial-avatar flex items-center justify-center text-xl font-bold">
                    {userInitial}
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-white">Hello, {userName}!</p>
                    <p className="text-xs text-gray-400">Welcome back to KR Motors</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="mobile-menu-item uppercase text-sm font-semibold tracking-wider hover:text-red-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="mobile-menu-item uppercase text-sm font-semibold tracking-wider hover:text-red-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="mobile-menu-item uppercase text-sm font-semibold tracking-wider hover:text-red-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mobile-menu-item uppercase text-sm font-semibold tracking-wider hover:text-red-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
            >
              Contact
            </Link>

            <div className="border-t border-white/20 my-3" />

            {/* User Actions */}
            {token ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="mobile-menu-item flex items-center gap-3 text-sm font-medium hover:text-red-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
                >
                  <FaUser className="w-5 h-5" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mobile-menu-item text-left text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mobile-menu-item flex items-center gap-3 text-sm font-medium hover:text-red-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
              >
                <FaUser className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}

      

      {/* Spacer for non-home pages */}
      {!isHome && <div className="h-[80px] sm:h-[90px] w-full" aria-hidden="true" />}
    </Fragment>
  );
}

// Helper function to trigger cart updates from anywhere in your app
export function triggerCartUpdate() {
  window.dispatchEvent(new Event("cartUpdated"));
}