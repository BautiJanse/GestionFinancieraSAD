'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      router.push('/dashboard'); // Redirige al dashboard si está autenticado
    } else {
      router.push('/login'); // Redirige al login si no está autenticado
    }
  }, [router]);

  return null; // No renderiza contenido en la raíz
};

export default HomePage;
