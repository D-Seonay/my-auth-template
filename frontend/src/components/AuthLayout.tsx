import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from './FloatingIcons';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  logo?: ReactNode;
}

const AuthLayout = ({ children, title, subtitle, logo }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <FloatingIcons />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo above card */}
        {logo && (
          <div className="flex justify-center mb-8">
            {logo}
          </div>
        )}

        <div className="auth-card rounded-3xl p-10">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-card-foreground mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
