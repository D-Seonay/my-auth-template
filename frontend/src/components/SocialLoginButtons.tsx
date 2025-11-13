// File: frontend/src/components/SocialLoginButtons.tsx
import React from 'react';

export function SocialLoginButtons() {
  const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

  const loginWithGoogle = () => {
    window.location.href = `${apiBase}/auth/google`;
  };

  return (
    <div>
      <button onClick={loginWithGoogle}>
        Continuer avec Google
      </button>
      {/* Ajoute Facebook/GitHub en copiant le même pattern */}
    </div>
  );
}
