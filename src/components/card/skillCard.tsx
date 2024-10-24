import { motion } from "framer-motion";


const skillBarVariants = {
    initial: { width: 0 },
    animate: (level: number) => ({
      width: `${(level / 5) * 100}%`,
      transition: {
        duration: 1,
        delay: 0.2,
        ease: "easeOut"
      }
    })
  };
  
const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };
  type Skill = {
    name: string;
    level: number;
    category: 'Frontend' | 'Backend' | 'Tools' | 'Cloud';
  };
  
  interface SkillCardProps {
    category: string;
    skills: Skill[];
  }
  
  export const SkillCard: React.FC<SkillCardProps> = ({ category, skills }) => {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">{category}</h3>
        <div className="space-y-4">
          {skills
            .filter((skill) => skill.category === category)
            .map((skill, index) => (
              <motion.div 
                key={skill.name} 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      custom={skill.level}
                      variants={skillBarVariants}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    );
  };