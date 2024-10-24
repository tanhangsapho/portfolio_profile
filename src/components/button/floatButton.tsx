// components/FloatingButton.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Sun, Moon, Github } from 'lucide-react';

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add your dark mode logic here
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/tanhangsapho', '_blank');
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
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={handleGitHubClick}
              >
                <Github size={20} />
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Main Floating Button - remains the same */}
        <motion.button
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors ${
            isOpen ? 'bg-blue-700' : ''
          }`}
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Settings 
            size={24} 
            className={`transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingButton;