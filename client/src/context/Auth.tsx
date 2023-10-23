import { useState, useContext, createContext } from "react";

interface Auth {
  user: null;
  accessToken: any;
  refreshToken: any;
  login: (newUser: any) => void;
  logout: () => void;
}
const AuthContext = createContext<Auth | null>(null);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function Auth({ children }: any) {
  const [user, setUser] = useState<null>(null);
  const [accessToken, setAccessToken] = useState<any>(
    localStorage.getItem("AccessToken")
  );
  const [refreshToken, setRefreshToken] = useState<any>(
    localStorage.getItem("RefreshToken")
  );

  const login = (newUser: any) => {
    setUser(newUser);
    setAccessToken(newUser);
    setRefreshToken(newUser);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
