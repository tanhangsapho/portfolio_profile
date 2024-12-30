import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Eye, Facebook } from "lucide-react";
import React, { useRef } from "react";

export const ContactSection = () => {
  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.section
      ref={contactRef}
      className="py-24 bg-gradient-to-b from-blue-50 to-white"
      initial={{ opacity: 0 }}
      animate={isContactInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            I&apos;m currently open to new opportunities and interesting
            projects. Feel free to reach out!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              className="p-6 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Me</h3>
              <a
                href="mailto:your.email@example.com"
                className="text-blue-600 hover:text-blue-700"
              >
                hangsaphotan@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="p-6 bg-white rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <Facebook className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Social Media</h3>
              <a
                href="https://www.facebook.com/sadbabyyoda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Pho
              </a>
            </motion.div>
          </div>

          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://github.com/tanhangsapho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/hangsapho-tan-45b10426b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </motion.a>

            <motion.a
              href="https://drive.google.com/file/d/1OunQR9djK8CL5V0SFJoBCncjCH6gYLnX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5 mr-2" />
              View CV
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
