// File: frontend/src/pages/OAuthSuccess.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OAuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      // Store securely. Consider httpOnly cookie for better security (set by server).
      localStorage.setItem('access_token', token);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  return <div>Connexion en cours...</div>;
}
