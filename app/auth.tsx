import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const theme = useTheme();
  const router = useRouter();
  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  const { signIn, signUp } = useAuth();
  const handleAuth = async () => {
    if (!Password || !email) {
      setError("Please fill in All the fields");
    }
    if (Password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError(null);
    if (isSignUp) {
      const error = await signUp(email, Password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await signIn(email, Password);
      if (error) {
        setError(error);
        return;
      }
      router.replace("/");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Text>
        <TextInput
          label="email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          label="Password"
          secureTextEntry
          autoCapitalize="none"
          mode="outlined"
          onChangeText={setPassword}
        />
        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
        <Button style={styles.button} mode="contained" onPress={handleAuth}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          style={styles.switchModeButton}
          mode="text"
          onPress={handleSwitchMode}
        >
          {isSignUp
            ? "Already have an account ? Sign In"
            : "Don't have an account ? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
