import { Link } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Home className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-bold text-lg text-foreground block leading-none">
              React Auth
            </span>
          </div>
        </Link>

        {/* Actions */}
        {isAuthenticated && (
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-primary/10 hover:text-primary"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
