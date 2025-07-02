import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signUp: (email: string, Password: string) => Promise<string | null>;
  signIn: (email: string, Password: string) => Promise<string | null>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const currentUser = await account.get(); // 🔁 this returns the user
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };
  const signUp = async (email: string, Password: string) => {
    try {
      await account.create(ID.unique(), email, Password);
      await signIn(email, Password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return " An Error occured in the signUp";
    }
  };
  const signIn = async (email: string, Password: string) => {
    try {
      await account.createEmailPasswordSession(email, Password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return " An Error occured during sign In";
    }
  };
  return (
    <AuthContext.Provider value={{ user, signIn, signUp, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of the AuthProvider");
  }

  return context;
}
