import { StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.View}>
      <Text>hahaha</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Link: {
    width: 100,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 8,
    textAlign: "center",
  },
});
