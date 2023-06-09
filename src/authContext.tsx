import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./service/firebase/firebaseConfig";
import LS from "./service/storage/LS";


interface AuthContextData {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

// @ts-ignore
export const AuthProvider: React.FC = ({ children }) => {
  let lsUser = LS.getUserInfo();
  const [user, setUser] = useState<User | null>(lsUser.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      LS.setUserInfo(user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
