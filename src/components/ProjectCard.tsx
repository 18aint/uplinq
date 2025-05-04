import { motion } from 'framer-motion';

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  image: string;
  metaLabel: string;
  tags: string[];
  theme: 'light' | 'dark';
}

const tagColors = {
  light: 'bg-gray-200 text-gray-800',
  dark: 'bg-gray-800 text-gray-100',
};

export const ProjectCard = ({
  index,
  title,
  description,
  image,
  metaLabel,
  tags,
  theme,
}: ProjectCardProps) => {
  const isEven = index % 2 === 0;
  return (
    <section
      className={`project-block w-full relative flex flex-col md:flex-row ${
        isEven ? '' : 'md:flex-row-reverse'
      } ${theme === 'dark' ? 'bg-[#181A1B] text-white' : 'bg-[#F9FCFD] text-gray-900'} transition-colors duration-500`}
      style={{ paddingInline: '6vw', paddingBlock: '10vh' }}
    >
      {/* Meta */}
      <div className="project-meta flex-1 flex flex-col justify-between mb-8 md:mb-0 md:mr-12 md:max-w-xs">
        <span className="meta-label font-mono uppercase tracking-widest text-xs mb-2 opacity-80">
          {metaLabel}
        </span>
        <div className="meta-tags flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-xs font-mono ${tagColors[theme]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="project-title text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-serif"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="project-description text-lg md:text-xl mb-8 max-w-2xl"
        >
          {description}
        </motion.p>
        {/* Animated left rule */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '64px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className={`h-1 ${theme === 'dark' ? 'bg-white/40' : 'bg-gray-900/40'} mb-8`}
        />
      </div>
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        viewport={{ once: true }}
        className="project-image flex-1 flex items-center justify-center relative"
      >
        <img
          src={image}
          alt={title}
          className="rounded-xl shadow-xl w-full max-w-xl object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300"
        />
        {/* Optional: cursor-follow CTA can be added here */}
      </motion.div>
    </section>
  );
};

export default ProjectCard; 