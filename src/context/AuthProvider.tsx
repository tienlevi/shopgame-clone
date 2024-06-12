import { createContext, useState } from "react";

interface Auth {
  accessToken: string;
  user: null;
  setUser: (value: any) => void;
}

export const AuthContext = createContext({} as Auth);

export const AuthProvider = ({ children }: any) => {
  const accessToken: any = localStorage.getItem("AccessToken");
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ accessToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
