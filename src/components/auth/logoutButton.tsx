'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { removeAuthToken } from '@/lib/cookies';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    router.push('/login');
    router.refresh();
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}