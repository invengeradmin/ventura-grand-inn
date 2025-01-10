'use client';

import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  // If there's no user, redirect to login
  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
