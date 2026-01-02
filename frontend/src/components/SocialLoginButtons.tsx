// File: frontend/src/components/SocialLoginButtons.tsx
import { Button } from '@/components/ui/button';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15.545 6.545a9 9 0 1 1-12.09 7.072" />
    <path d="M15 6h5.93a.1.1 0 0 1 .1.112l-1.044 4.888" />
    <path d="M17 10h-5.93a.1.1 0 0 0-.1.112l1.044 4.888" />
    <path d="M12.5 10.5h-5" />
    <path d="M18.3 9.4c-1.2-1-2.9-1-4.6-1H6.5" />
    <path d="M12.2 14.8c1.2 1 2.9 1 4.6 1h5.2" />
  </svg>
);

export function SocialLoginButtons() {
  const apiBase =
    import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

  const loginWithGoogle = () => {
    window.location.href = `${apiBase}/auth/google`;
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={loginWithGoogle}
      >
        <GoogleIcon className="mr-2 h-4 w-4" />
        Continuer avec Google
      </Button>
    </div>
  );
}
