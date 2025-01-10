'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user session
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    getUser();

    // Listen to authentication state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup subscription
    return () => subscription?.unsubscribe();
  }, []);

  return { user };
}
