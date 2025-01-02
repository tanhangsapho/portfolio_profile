"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { projects } from "./type";
import { ProjectCard } from "./card/projectCard";

export const Project = () => {
  const projectsRef = useRef(null);
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
  return (
    <motion.section
      ref={projectsRef}
      className="py-24"
      style={{
        background: "var(--gradient-background)",
      }}
      initial={{ opacity: 0 }}
      animate={isProjectsInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16 "
          initial={{ opacity: 0, y: 20 }}
          animate={
            isProjectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            experience in full-stack development.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 "
          initial={{ opacity: 0, y: 20 }}
          animate={
            isProjectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
