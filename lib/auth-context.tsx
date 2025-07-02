import { createContext, useContext } from "react";
import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  //user: Models.User<Models.Preferences> | null;
  signUp: (email: string, Password: string) => Promise<string | null>;
  signIn: (email: string, Password: string) => Promise<string | null>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
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
    <AuthContext.Provider value={{ signIn, signUp }}>
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
