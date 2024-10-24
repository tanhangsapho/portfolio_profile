import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl?: string;
}

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  const linkButtonVariants = {
    initial: { 
      opacity: 0,
      y: 20 
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="relative group rounded-lg overflow-hidden bg-white shadow-lg"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay with links */}
        <motion.div 
          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial="initial"
          whileHover="hover"
        >
          {/* <motion.a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            variants={linkButtonVariants}
          >
            <ExternalLink className="w-6 h-6 text-gray-800" />
          </motion.a> */}
          
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              variants={linkButtonVariants}
            >
              <Github className="w-6 h-6 text-gray-800" />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="p-6"
        variants={contentVariants}
      >
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;