"use client";
import { FC, useState, useEffect, useRef } from "react";
import Head from "next/head";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Eye,
} from "lucide-react";
import { ProjectCard } from "@/components/card/projectCard";
import { SkillCard } from "@/components/card/skillCard";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/aboutMe";
import FloatingButton from "@/components/button/floatButton";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl?: string;
}

interface Skill {
  name: string;
  level: number;
  category: "Frontend" | "Backend" | "Tools" | "Cloud";
}

const projects: Project[] = [
  {
    id: 1,
    title: "Chekromlek",
    description:
      "Full-stack e-commerce solution with real-time inventory management.",
    technologies: ["Next.js", "TypeScript", "MongoDB"],
    imageUrl: "https://my-image-storage-bucket-1234.s3.us-east-1.amazonaws.com/photo_2024-10-24_14-26-12.jpg",
    projectUrl: "https://project-url.com",
    githubUrl: "https://github.com/chunminglingg/Chekromlek_Monorepo.git",
  },
];

const skills: Skill[] = [
  { name: "TypeScript", level: 4, category: "Frontend" },
  { name: "React/Next.js", level: 4, category: "Frontend" },
  { name: "Tailwind CSS", level: 4, category: "Frontend" },
  { name: "Node.js", level: 4.5, category: "Backend" },
  { name: "PostgreSQL", level: 4, category: "Backend" },
  { name: "AWS", level: 2, category: "Cloud" },
  { name: "Docker", level: 4, category: "Tools" },
  { name: "Git", level: 4.5, category: "Tools" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const CV_URL = "https://drive.google.com/file/d/1OunQR9djK8CL5V0SFJoBCncjCH6gYLnX/view?usp=sharing";
  const projectsRef = useRef(null);
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Tan Hangsapho - Software Engineer</title>
        <meta
          name="description"
          content="Professional portfolio of [Your Name] - Software Engineer"
        />
      </Head>
      <FloatingButton/>
      {/* Hero Section */}
      <HeroSection/>
      <section id="about" className="py-16">
        <AboutSection />
      </section>

      {/* Projects Section */}
      <motion.section 
        ref={projectsRef}
        className="py-16"
        variants={sectionVariants}
        initial="hidden"
        animate={isProjectsInView ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
           <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            Skills
          </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {(["Frontend", "Backend", "Cloud", "Tools"] as const).map(
                (category) => (
                  <SkillCard
                    key={category}
                    category={category}
                    skills={skills}
                  />
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Open to new opportunities and interesting projects.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() =>
                  (window.location.href = "https://github.com/tanhangsapho")
                }
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <Github className="w-5 h-5 mr-2" />
               Github
              </button>
              <button
                onClick={() => window.open(CV_URL, "_blank")}
                className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                <Eye className="w-5 h-5 mr-2" />
                View CV
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Tan Hangsapho. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;