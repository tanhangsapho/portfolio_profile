"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Sun, Moon, Github, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";

// Types
type MenuState = {
  isOpen: boolean;
  showScrollTop: boolean;
  buttonBottom: number;
};

// Constants
const CONSTANTS = {
  BOTTOM_SPACING: 32,
  GITHUB_URL: "https://github.com/tanhangsapho",
  ANIMATION_DURATION: 0.2,
} as const;

// Animation variants
const ANIMATION_VARIANTS = {
  button: {
    hover: {
      scale: 1.05,
      transition: { duration: CONSTANTS.ANIMATION_DURATION },
    },
  },
  menu: {
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
  },
  item: {
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
  },
} as const;

// Custom hook for scroll handling
const useScrollHandler = (
  setMenuState: React.Dispatch<React.SetStateAction<MenuState>>
) => {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const isNearFooter = footerRect.top <= viewportHeight;
      const newButtonBottom = isNearFooter
        ? viewportHeight - footerRect.top + CONSTANTS.BOTTOM_SPACING
        : CONSTANTS.BOTTOM_SPACING;

      setMenuState((prev) => {
        // Only update state if values change
        if (
          prev.buttonBottom !== newButtonBottom ||
          prev.showScrollTop !== isNearFooter
        ) {
          return {
            ...prev,
            buttonBottom: newButtonBottom,
            showScrollTop: isNearFooter,
          };
        }
        return prev;
      });
    };

    // Run the handler once on mount
    handleScroll();

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setMenuState]); // Dependencies: Only include the state setter
};

// Custom hook for click outside handling
const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
};

const FloatingButton = () => {
  // State management
  const [mounted, setMounted] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>({
    isOpen: false,
    showScrollTop: false,
    buttonBottom: CONSTANTS.BOTTOM_SPACING,
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollHandler(setMenuState);

  useClickOutside(menuRef, () =>
    setMenuState((prev) => ({ ...prev, isOpen: false }))
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleGithubClick = () => {
    window.open(CONSTANTS.GITHUB_URL, "_blank", "noopener noreferrer");
  };

  if (!mounted) return null;

  const renderMenuItems = () => (
    <motion.div
      className="absolute bottom-16 right-0 space-y-3"
      variants={ANIMATION_VARIANTS.menu}
      initial="hidden"
      animate="visible"
      exit="hidden"
      aria-label="Menu items"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-lg text-foreground hover:bg-muted transition-colors"
        onClick={handleGithubClick}
        aria-label="Visit GitHub profile"
      >
        <Github size={20} aria-hidden="true" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-lg text-foreground hover:bg-muted transition-colors"
        onClick={handleThemeToggle}
        aria-label={`Switch to ${
          resolvedTheme === "dark" ? "light" : "dark"
        } mode`}
      >
        {resolvedTheme === "dark" ? (
          <Sun size={20} aria-hidden="true" />
        ) : (
          <Moon size={20} aria-hidden="true" />
        )}
      </motion.button>
    </motion.div>
  );

  const renderMainButton = () =>
    menuState.showScrollTop ? (
      <motion.button
        key="scroll-top"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        initial={{ rotate: 180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} aria-hidden="true" />
      </motion.button>
    ) : (
      <motion.button
        key="settings"
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors ${
          menuState.isOpen ? "bg-primary/90" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -180, opacity: 0 }}
        onClick={() =>
          setMenuState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
        aria-expanded={menuState.isOpen}
        aria-label="Toggle menu"
      >
        <Settings
          size={24}
          className={`transition-transform duration-300 ${
            menuState.isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </motion.button>
    );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-8 z-50"
        style={{ bottom: menuState.buttonBottom }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: CONSTANTS.ANIMATION_DURATION }}
        ref={menuRef}
        role="complementary"
        aria-label="Floating action buttons"
      >
        <div className="relative">
          <AnimatePresence>
            {menuState.isOpen && !menuState.showScrollTop && renderMenuItems()}
          </AnimatePresence>

          <AnimatePresence mode="wait">{renderMainButton()}</AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingButton;
