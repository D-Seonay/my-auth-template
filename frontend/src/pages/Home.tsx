import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import FloatingIcons from '@/components/FloatingIcons';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Authentification JWT avec tokens sécurisés',
    },
    {
      icon: Lock,
      title: 'Protégé',
      description: 'Routes privées et gestion des accès',
    },
    {
      icon: Zap,
      title: 'Rapide',
      description: 'Performance optimale avec React et TypeScript',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <FloatingIcons />
      
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Bienvenue sur
            <br />
            <span className="text-primary">
              React Auth Template
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Une application d'authentification moderne avec React, TypeScript et un design minimaliste épuré.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/login">
              <Button size="lg" className="gap-2 group bg-primary hover:bg-primary/90 text-primary-foreground">
                Se connecter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-border hover:bg-primary/10 hover:border-primary">
                S'inscrire
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-card rounded-xl p-6 text-center hover:bg-primary/5 transition-all duration-300 border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
