"use client"
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SkillCardProps } from "./type";

export const SkillCard: React.FC<SkillCardProps> = ({ category, skills }) => {
  return (
    <motion.div
      className="bg-card p-6 rounded-xl shadow-lg border border-border"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-foreground  mb-4">{category}</h3>
      <div className="space-y-4">
        {skills[category].map((skill, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <span className="text-gray-700 text-muted-foreground">
                  {skill.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {skill.proficiency}%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SkillSection = () => {
  const skillsRef = useRef(null);

  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.2 });

  const skills = {
    Frontend: [
      { name: "React", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "Next.js", proficiency: 88 },
      { name: "Tailwind CSS", proficiency: 92 },
    ],
    Backend: [
      { name: "Node.js", proficiency: 88 },
      { name: "Express.js", proficiency: 85 },
      { name: "PostgreSQL", proficiency: 82 },
      { name: "Prisma", proficiency: 80 },
    ],
    Cloud: [
      { name: "AWS", proficiency: 75 },
      { name: "Docker", proficiency: 78 },
      { name: "Vercel", proficiency: 85 },
    ],
    Tools: [
      { name: "Git", proficiency: 90 },
      { name: "VS Code", proficiency: 95 },
      { name: "Figma", proficiency: 80 },
    ],
  };

  return (
    <>
      {/* Skills Section */}
      <motion.section
        ref={skillsRef}
        className="py-24"
        style={{
          background: "var(--gradient-background)",
        }}
        initial={{ opacity: 0 }}
        animate={isSkillsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency
              across different areas of software development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(Object.keys(skills) as Array<keyof typeof skills>).map(
              (category) => (
                <SkillCard key={category} category={category} skills={skills} />
              )
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default SkillSection;
