import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@/api/axios';
import { toast } from 'react-hot-toast';

interface User {
  email: string;
  sub?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger le token depuis localStorage au démarrage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { access_token } = response.data;
      
      const decoded = jwtDecode<User>(access_token);
      
      localStorage.setItem('token', access_token);
      setToken(access_token);
      setUser(decoded);
      
      toast.success('Connexion réussie !');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur de connexion';
      toast.error(message);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await axiosInstance.post('/auth/register', { email, password });
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Déconnexion réussie');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
