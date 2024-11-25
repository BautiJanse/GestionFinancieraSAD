'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2VzdGlvbl9maW5hbmNpZXJhIiwibW9kdWxlIjoiZ2VzdGlvbl9maW5hbmNpZXJhIn0.3mwZIDf9ZQYhO9xT4mtXlSAzWT1ATjPn1Ly8h5DaByE';

    if (isLoggedIn) {
      router.push('/dashboard'); // Redirige al dashboard si está autenticado
    } else {
      router.push('/login'); // Redirige al login si no está autenticado
    }
  }, [router]);

  return null; // No renderiza contenido en la raíz
};

export default HomePage;
