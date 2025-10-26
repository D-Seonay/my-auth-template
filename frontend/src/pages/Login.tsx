import { useState, FormEvent } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Home } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/AuthLayout';
import Input from '@/components/Input';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
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
      title="Authorization"
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

        <div className="flex items-center justify-end text-sm">
          <button
            type="button"
            className="text-card-foreground/70 hover:text-card-foreground transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={loading}
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Connexion...
            </>
          ) : (
            'Log in'
          )}
        </Button>

        <div className="text-center text-sm text-card-foreground/70">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-card-foreground hover:text-primary font-semibold transition-colors"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
