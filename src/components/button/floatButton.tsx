import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Sun, Moon, Github } from "lucide-react";
import { useTheme } from "next-themes";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

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
    <div className="fixed bottom-8 right-8 z-50" ref={menuRef}>
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
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

        <motion.button
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors ${
            isOpen ? "bg-primary/90" : ""
          }`}
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Settings
            size={24}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingButton;
