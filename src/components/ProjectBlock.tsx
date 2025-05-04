import { motion } from 'framer-motion';

interface ProjectBlockProps {
  index: number;
  title: string;
  description: string;
  image: string;
  metaLabel: string;
  tags: string[];
  isLast?: boolean;
}

const ProjectBlock = ({
  index,
  title,
  description,
  image,
  metaLabel,
  tags,
  isLast = false,
}: ProjectBlockProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-10 group">
      {/* Textual Content */}
      <div className="flex-1">
        <div className="text-sm uppercase tracking-wider text-blue-500 mb-1 font-mono">
          {metaLabel}
        </div>
        <h2 className="text-3xl font-semibold text-gray-900 group-hover:underline transition-all duration-300">
          {title}
        </h2>
        <p className="mt-3 text-gray-600 max-w-md">
          {description}
        </p>
        <div className="mt-4 flex gap-3 text-xs text-gray-500 uppercase tracking-wide">
          {tags.map((tag, i) => (
            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-semibold">
              {tag}
            </span>
          ))}
        </div>
        {isLast && (
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            className="inline-block mt-6 px-5 py-2 rounded-full bg-blue-500 text-white font-medium shadow-md transition-all duration-300 hover:bg-blue-600"
          >
            View full case study
          </motion.a>
        )}
      </div>
      {/* Image Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-1 rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-blue-50 to-white group-hover:shadow-lg transition-shadow duration-300"
      >
        <img src={image} alt={title} className="w-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105" />
      </motion.div>
    </div>
  );
};

export default ProjectBlock; 