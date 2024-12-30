import { motion } from "framer-motion";
import { Star, Github, ExternalLink } from "lucide-react";
import { ProjectCardProps } from "../type";
import Image from "next/image";

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          height={200}
          width={200}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-muted-foreground ">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 text-muted-foreground ">
          {project.description}
        </p>

        {project.highlights && (
          <ul className="mb-4 space-y-1">
            {project.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-600 text-muted-foreground "
              >
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full "
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors text-muted-foreground "
          >
            <Github className="w-5 h-5 mr-1" />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors text-muted-foreground "
            >
              <ExternalLink className="w-5 h-5 mr-1" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
