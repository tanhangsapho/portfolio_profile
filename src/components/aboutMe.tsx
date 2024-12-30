import React from "react";
import { MapPin, Code, Book } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const experienceItems = [
    {
      period: "2023 - 2024",
      title: "Full Stack Web Development at SabaiCode",
      location: "Chrouy Changvar, Phnom Penh, Cambodia",
      description:
        "Built full-stack applications using Next, Node.js, and Mongodb. Key projects include:",
      highlights: [],
      icon: <Code className="w-5 h-5" />,
      category: "experience",
    },
    {
      period: "2024",
      title: "Backend Developer Intern at Digital Government Committee",
      location: "Building 13 Preah Monivong Blvd (93), Phnom Penh",
      description:
        "Contributed to government digital transformation initiatives:",
      highlights: [
        "Developed RESTful APIs using Node.js and Express",
        "Implemented database optimization strategies",
        "Collaborated with cross-functional teams on microservices architecture",
      ],
      icon: <Code className="w-5 h-5" />,
      category: "experience",
    },
    {
      period: "2020-2024",
      title: "Royal University Of Phnom Penh",
      subtitle: "Bachelor's Degree",
      location: "Toul Kork, Phnom Penh, Cambodia",
      description: "Computer Science and Engineering",
      highlights: [
        "Focus on software engineering and web development",
        "Completed advanced coursework in algorithms and data structures",
        "Participated in programming competitions",
      ],
      icon: <Book className="w-5 h-5" />,
      category: "education",
    },
    {
      period: "2020-2024",
      title: "Toul Tom Pong High School",
      location: "Street 155, Phnom Penh, Cambodia",
      icon: <Book className="w-5 h-5" />,
      category: "education",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Experience & Education
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building digital solutions and continuously learning through
            practical experience and academic excellence.
          </p>
        </motion.div>

        {/* Timeline Sections */}
        {["experience", "education"].map((category) => (
          <div key={category} className="mb-16">
            <motion.h3
              className="text-2xl font-semibold text-gray-800 mb-8 capitalize"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              {category}
            </motion.h3>

            <div className="relative">
              <motion.div
                className="absolute left-[40px] top-0 bottom-0 w-0.5 bg-blue-200"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />

              <motion.div
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {experienceItems
                  .filter((item) => item.category === category)
                  .map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-16"
                      variants={itemVariants}
                    >
                      <div className="absolute left-0 p-2 bg-white rounded-full border border-blue-200">
                        {item.icon}
                      </div>

                      <motion.div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        variants={cardVariants}
                        whileHover="hover"
                      >
                        <div className="text-sm font-medium text-blue-600 mb-2">
                          {item.period}
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <div className="text-md text-gray-700 mb-2">
                            {item.subtitle}
                          </div>
                        )}
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                        {item.description && (
                          <p className="text-gray-600 mb-3">
                            {item.description}
                          </p>
                        )}
                        {item.highlights && (
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {item.highlights.map((highlight, i) => (
                              <li key={i}>{highlight}</li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
