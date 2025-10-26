import { motion } from 'framer-motion';
import { FileText, Home, Building } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: FileText, delay: 0, x: '10%', y: '20%' },
    { Icon: Home, delay: 0.5, x: '85%', y: '15%' },
    { Icon: Building, delay: 1, x: '15%', y: '70%' },
    { Icon: FileText, delay: 1.5, x: '80%', y: '60%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{ left: item.x, top: item.y }}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
            <item.Icon className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
