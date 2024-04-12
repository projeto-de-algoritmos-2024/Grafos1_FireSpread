import { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types/User';
import { api } from '../lib/api';

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const defaultState: AuthContextType = {
    user: null,
    login: () => {},
    logout: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    useEffect(() => {
      const verifySession = async () => {
          try {
            const response = await api.get('/users/check-auth', {withCredentials: true});

            if (response.status !== 200) {
                logout();
                return;
            }
            login(response.data);
          } catch (error) {
              console.error('Session verification failed:', error);
              logout();
          }
      };

      verifySession();
    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
