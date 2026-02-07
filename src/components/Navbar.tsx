import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import logo from '../assets/logo.png';


const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Coordinators', href: '#coordinators' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };

  const handleAnchorLinkClick = (anchor: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // If already on home page, just scroll
    if (location.pathname === '/') {
      const element = document.getElementById(anchor.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home with hash, scroll will be handled by Index component
      navigate(`/#${anchor.slice(1)}`);
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`transition-all duration-500 ease-out ${scrolled
          ? 'bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-primary/10'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 group relative z-10"
            >
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={handleLinkClick}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-lg blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <img
                    src={logo}
                    alt="KRIVVASS'26 logo"
                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain relative z-10"



                  />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);
                const isAnchorLink = link.href.startsWith('#');
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative"
                  >
                    {isAnchorLink ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleAnchorLinkClick(link.href, e)}
                        className="relative px-4 py-2 group"
                      >
                        <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${isActive
                          ? 'text-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                          }`}>
                          {link.name}
                        </span>

                        {/* Hover background effect */}
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          layoutId={isActive ? "activeNav" : undefined}
                        />

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-0 right-0 mx-auto w-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30
                            }}
                          />
                        )}

                        {/* Hover underline */}
                        <span className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0.5 bg-gradient-to-r from-primary/50 via-accent/50 to-secondary/50 group-hover:w-[calc(100%-2rem)] transition-all duration-500 ease-out rounded-full" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={handleLinkClick}
                        className="relative px-4 py-2 group"
                      >
                        <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${isActive
                          ? 'text-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                          }`}>
                          {link.name}
                        </span>

                        {/* Hover background effect */}
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          layoutId={isActive ? "activeNav" : undefined}
                        />

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-0 right-0 mx-auto w-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30
                            }}
                          />
                        )}

                        {/* Hover underline */}
                        <span className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0.5 bg-gradient-to-r from-primary/50 via-accent/50 to-secondary/50 group-hover:w-[calc(100%-2rem)] transition-all duration-500 ease-out rounded-full" />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden md:block"
            >
              <motion.button
                className="relative px-6 py-2.5 rounded-xl font-semibold text-sm text-white overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />

                {/* Glow effect */}
<div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500">
  <div className="absolute inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-secondary blur-md" />
</div>



                <span className="relative z-10 flex items-center gap-2">
                  Register Now
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-foreground relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = isActiveLink(link.href);
                  const isAnchorLink = link.href.startsWith('#');

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      {isAnchorLink ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleAnchorLinkClick(link.href, e)}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${isActive
                            ? 'bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                            }`}
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={handleLinkClick}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${isActive
                            ? 'bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                            }`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                  className="pt-4"
                >
                  <button className="w-full btn-primary text-base !py-3">
                    Register Now
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
