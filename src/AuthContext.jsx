import React, { createContext } from 'react';
import { client } from './utils/neon';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Neon Auth keeps this in sync after sign-in, email verification and sign-out.
  const { data, isPending } = client.auth.useSession();

  const signOut = () => client.auth.signOut();

  return (
    <AuthContext.Provider value={{ user: data?.user ?? null, loading: isPending, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
