import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2VzdGlvbl9maW5hbmNpZXJhIiwibW9kdWxlIjoiZ2VzdGlvbl9maW5hbmNpZXJhIn0.3mwZIDf9ZQYhO9xT4mtXlSAzWT1ATjPn1Ly8h5DaByE') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push('/login'); // Redirige al login si no está autenticado
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
