import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

type AuthContextType = {
  user: any;
  token: string | null;
  loading: boolean;
  login: (jwtToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    loading: true,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error("Token inválido");
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (jwtToken: string) => {
    try {
      const decoded = jwtDecode(jwtToken);
      setUser(decoded);
      setToken(jwtToken);
      sessionStorage.setItem("token", jwtToken);
    } catch (error) {
      console.error("Token inválido");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);