"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/aboutMe";
import FloatingButton from "@/components/button/floatButton";
import { ContactSection } from "@/components/Contact";
import SkillSection from "@/components/Skill";
import { Project } from "@/components/Project";

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  console.log(activeSection);
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
      <FloatingButton />
      {/* Hero Section */}
      <HeroSection />
      <section id="about" className="py-16">
        <AboutSection />
      </section>
      {/* Projects Section */}
      <Project />
      <SkillSection />
      <ContactSection />
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
