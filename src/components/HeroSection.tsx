import React from "react";
import { motion } from "framer-motion";
import { Mail, Download, ChevronDown, Github, Eye } from "lucide-react";

const HeroSection = () => {
  const technologies = [
    "React",
    "TypeScript",
    "Node.js",
    "Next.js",
    "AWS",
    "PostgreSQL",
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full opacity-30 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Tan Hangsapho
                </span>
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Full Stack Developer
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Building digital experiences that make a difference. Specialized
              in modern web technologies and passionate about creating
              intuitive, high-performance applications.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://drive.google.com/file/d/1OunQR9djK8CL5V0SFJoBCncjCH6gYLnX/view?usp=sharing", "_blank")} 
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Eye className="w-5 h-5" />
                View CV
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative max-w-md mx-auto">
              {/* Profile Image Container */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-2xl">
                <img
                  src="https://my-image-storage-bucket-1234.s3.us-east-1.amazonaws.com/photo_2024-10-24_10-59-48.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  🚀 Open to Work
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -left-4 -bottom-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  💻 Full Stack Developer
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-gray-400 mx-auto mt-1" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
