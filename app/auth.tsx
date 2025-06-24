import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <View>
        <Text>Create an account</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
