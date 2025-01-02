"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Sun, Moon, Github, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(32); // Default bottom spacing in pixels
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const defaultBottomSpacing = 32;
      if (footerRect.top <= viewportHeight) {
        const overlapDistance = viewportHeight - footerRect.top + defaultBottomSpacing;
        setButtonBottom(overlapDistance);
        setShowScrollTop(true); 
      } else {
        setButtonBottom(defaultBottomSpacing);
        setShowScrollTop(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-8 z-50"
        style={{ bottom: buttonBottom }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        ref={menuRef}
      >
        <div className="relative">
          <AnimatePresence>
            {isOpen && !showScrollTop && (
              <motion.div
                className="absolute bottom-16 right-0 space-y-3"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* GitHub Button */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-lg text-foreground hover:bg-muted transition-colors"
                  onClick={() =>
                    window.open("https://github.com/tanhangsapho", "_blank")
                  }
                >
                  <Github size={20} />
                </motion.button>

                {/* Dark Mode Toggle */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-lg text-foreground hover:bg-muted transition-colors"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showScrollTop ? (
              <motion.button
                key="scroll-top"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                onClick={scrollToTop}
              >
                <ArrowUp size={24} />
              </motion.button>
            ) : (
              <motion.button
                key="settings"
                className={`flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors ${
                  isOpen ? "bg-primary/90" : ""
                }`}
                variants={buttonVariants}
                whileHover="hover"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Settings
                  size={24}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingButton;
