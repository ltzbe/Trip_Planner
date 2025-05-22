import { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const getTokenFromCookie = () => {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const [token, setToken] = useState<string | null>(() => getTokenFromCookie());

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);