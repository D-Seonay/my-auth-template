import { motion } from 'framer-motion';
import { User, Mail, Shield, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import FloatingIcons from '@/components/FloatingIcons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Mail,
      label: 'Email',
      value: user?.email || 'N/A',
    },
    {
      icon: Shield,
      label: 'Status',
      value: 'Authenticated',
    },
    {
      icon: Clock,
      label: 'Session',
      value: 'Active',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <FloatingIcons />
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Bienvenue, {user?.email?.split('@')[0]} !
            </h1>
            <p className="text-muted-foreground">
              Vous êtes connecté à votre tableau de bord
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {stat.label}
                        </p>
                        <p className="font-semibold text-card-foreground">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Informations du compte</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Détails de votre session actuelle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-card-foreground">
                    <span className="font-semibold">Email:</span> {user?.email}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm text-card-foreground">
                    <span className="font-semibold">Statut:</span> Authentifié avec succès
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-sm text-card-foreground">
                    <span className="font-semibold">Token JWT:</span> Stocké en sécurité dans localStorage
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
