import { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const getTokenFromCookie = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const [token, setToken] = useState<string | null>(() => getTokenFromCookie());

  const login = (newToken: string) => {
    const expires = new Date(Date.now() + 30 * 60 * 1000).toUTCString();
    document.cookie = `token=${newToken}; path=/; expires=${expires}`;
    setToken(newToken);
  };

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
