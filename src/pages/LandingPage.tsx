import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/design-system';
import { useTheme } from '../components/ui/theme';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();

  const handleStartMapping = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0">
          {/* Floating circles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-display font-bold mb-6">
              <span className="gradient-text">Mind</span>
              <span className="text-text">Canvas</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-h4 text-muted mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your ideas into beautiful, interactive knowledge maps. 
            Create, connect, and explore concepts with stunning animations and intuitive design.
          </motion.p>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              variant="primary" 
              size="lg"
              className="px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300"
              onClick={handleStartMapping}
            >
              Start Mapping
            </Button>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                Interactive Nodes
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Smooth Animations
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Multiple Themes
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Link to Design System Page */}
      <div className="absolute bottom-4 right-4">
        <a href="/design-system" className="text-sm text-muted hover:text-text underline focus-ring p-1 rounded">
          Design System
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
