import { useState, FormEvent } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Home } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/AuthLayout';
import Input from '@/components/Input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logo = (
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center">
        <Home className="w-8 h-8 text-primary" />
      </div>
      <div className="text-left">
        <div className="text-2xl font-bold text-foreground leading-none">RA</div>
        <div className="text-xs text-primary font-semibold uppercase tracking-wider">REACT AUTH</div>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Créez votre compte pour commencer"
      logo={logo}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <Input
          label="Password"
          type="password"
          placeholder="******************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="******************"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={loading}
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Création...
            </>
          ) : (
            'Sign up'
          )}
        </Button>

        <div className="text-center text-sm text-card-foreground/70">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-card-foreground hover:text-primary font-semibold transition-colors"
          >
            Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
