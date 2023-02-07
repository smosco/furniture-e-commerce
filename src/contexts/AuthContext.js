import { createContext, useState, useEffect, useContext } from "react";
import { onUserStateChange } from "../api/firebase";
import { login, logout } from "../api/firebase";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      //console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
