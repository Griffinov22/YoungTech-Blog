import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const exportValues = { user, setUser };

  return <AuthContext.Provider value={exportValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
