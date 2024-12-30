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
      className="py-24 bg-gradient-to-b from-background/50 to-background"
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
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            I&apos;m currently open to new opportunities and interesting
            projects. Feel free to reach out!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              className="p-6 bg-card rounded-xl shadow-lg border border-border"
              whileHover={{ y: -5 }}
            >
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Email Me
              </h3>
              <a
                href="mailto:hangsaphotan@gmail.com"
                className="text-primary hover:text-primary/90"
              >
                hangsaphotan@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="p-6 bg-card rounded-xl shadow-lg border border-border"
              whileHover={{ y: -5 }}
            >
              <Facebook className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Social Media
              </h3>
              <a
                href="https://www.facebook.com/sadbabyyoda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/90"
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
              className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-300"
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
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
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
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
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
