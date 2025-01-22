"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { projects } from "./type";
import { ProjectCard } from "./card/projectCard";

export const Project = () => {
  const projectsRef = useRef(null);
  // const headerRef = useRef(null);

  const isProjectsInView = useInView(projectsRef, {
    once: false,
    amount: 0.2,
    margin: "-100px 0px -100px 0px",
  });

  // const isHeaderInView = useInView(headerRef, {
  //   once: false,
  //   amount: 0.2,
  //   margin: "-100px 0px -100px 0px",
  // });

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  // const headerVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 30,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 1,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  return (
    <motion.section
      ref={projectsRef}
      className="py-24"
      style={{
        background: "var(--gradient-background)",
      }}
      initial="hidden"
      animate={isProjectsInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 1.2,
            ease: "easeOut",
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                  scale: 0.95,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 1,
                    delay: index * 0.2,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
