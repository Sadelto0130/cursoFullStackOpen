import { router } from "expo-router";
import { Button, View } from "react-native";

export default function Test() {
  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Ir a SignIn" onPress={() => router.push("/signin")} />
    </View>
  );
}
